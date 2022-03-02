import React, { useState, useEffect } from "react"
import { createContext, useContext, useMemo } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button"
import "../Styles/sign_in_page.css"



const UserContext = createContext({
    username: "",
    setUsername: () => { }
});


const Sign_in_page = () => {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [user, setUser] = useState()
    let navigate = useNavigate();

    // let navigate = useNavigate();
    //   const onClick = () => {
    //     navigate(`/filter/1/${props.item.name}`)
    //     //console.log(`${type}`)

    //   }
    //let navigate = new navigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { name, username }
        // send the username and password to the server
        const response = await axios.post(
            "http://localhost:2222/user/userlogin",
            user
        )
        // set the state of the user
        setUser(response.data)
        //  store the user in localStorage
        localStorage.setItem("user", JSON.stringify(response.data))

        console.log(response.data)
        navigate("/frontpage");

    }

    const value = useMemo(() => ({ username, setUsername }), [username]);
    const handleLogout = () => {
        setUser({})
        setName("")
        setUsername("")
        localStorage.clear()
    }
    // if there's a user show the message below

    if (user) {
        return <div>{user.name} is loggged in</div>
    }

    // if there's no user, show the login form
    return (
        <div className="container">
            <div className="title">Enter Your Credentials</div>
            <UserContext.Provider value={value}>
                <input
                    className="name_section"
                    type="text"
                    value={name.name}
                    placeholder="Enter Your Name"
                    onChange={({ target }) => setName(target.value)}
                />

                <input
                    className="username_section"
                    type="text"
                    value={username.username}
                    placeholder="Enter your username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                <button className="submitbutton" type="submit" onClick={handleSubmit}>
                    Login
                </button>
            </UserContext.Provider>
        </div>
    )
}

export default Sign_in_page


{/* <UserContext.Provider value={value}>
      <UserNameInput />
      <UserInfo />
    </UserContext.Provider> */}