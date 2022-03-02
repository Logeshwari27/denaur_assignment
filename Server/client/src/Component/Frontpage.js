import React, {
    useState,
    useEffect,
    useRef,
} from "react"

import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button"
import Image1 from "../Assests/rectangle1/Picture2.png"
import Image2 from "../Assests/Picture4.jpg"
import Image3 from "../Assests/rectangle3/Picture3.jpg"
import coin from "../Assests/rectangle1/Ellipse 3.jpg"
import Vector from "../Assests/rectangle1/Vector.jpg"
import Vector1 from "../Assests/rectangle1/Group 997.jpg"
import Vector2 from "../Assests/rectangle3/Vector_1.jpg"
import Message from "../Assests/rectangle3/Vector_2.jpg"
import Forward from "../Assests/rectangle3/Vector_3.jpg"

import "../Styles/frontpage.css"

export default function Frontpage() {

    const [isLoggedin, setIsLoggedIn] = useState(false)

    const { UserData } = JSON.parse(localStorage.getItem("user"))
    const [userDetails, setUserDetails] = useState({
        name: "",
        username: "",
        netcoins: 1100,
        grosscoins: 2100,
    })
    const requestOptions = {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
    }


    const Ref = useRef(null)
    // The state for our timer
    const [timer, setTimer] = useState("00:00:00")

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date())

        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const hours = Math.floor(((total / 1000) * 60 * 60) % 24)
        return {
            total,
            hours,
            minutes,
            seconds,
        }
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e)
        if (total >= 0) {
            // update the time
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            )
        }
    }
    const clearTimer = (e) => {
        setTimer("144:00:00")
        if (Ref.current) clearInterval(Ref.current)
        const id = setInterval(() => {
            startTimer(e)
        }, 1000)
        Ref.current = id
    }

    const getDeadTime = () => {
        let deadline = new Date()
        deadline.setHours(deadline.getHours() + 10)
        return deadline
    }
    useEffect(() => {
        clearTimer(getDeadTime())
    }, [])

    // Get Date and Time
    const current = new Date()
    const date = `${current.getDate()}/${current.getMonth() + 1
        }/${current.getFullYear()}`
    const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`

    async function updateCoins() {
        const netcoinsFromLead = userDetails.netcoins + 100;
        const grosscoinsCalculated = userDetails.grosscoins + netcoinsFromLead;
        const req = await axios.put(
            `http://localhost:2222/user/savecoins/${UserData._id}`,
            { netcoins: netcoinsFromLead, grosscoins: grosscoinsCalculated }
        )

        if (!!req) {
            const topValuerResp = await axios.get(
                `http://localhost:2222/user/topvaluer`,
            )
            if (!!topValuerResp) {
                const currentTopValuer = topValuerResp.data.data;
                userDetails.netcoins = currentTopValuer.netcoins;
                userDetails.grosscoins = currentTopValuer.grosscoins;
                setUserDetails({ ...userDetails });
            }
        }
    }
    //calulating Net Coins and Gross Coins

    return (
        <div className="frontpage_view">
            <div className="userdetailsimage">
                <div className="Avatar1">
                    <img src={Image1} className="" />
                </div>
                <div className="usernametext">{UserData.name}
                    <h3 className="datetime"> {date}{time}
                    </h3></div>
                <div></div>
                <div className="pointdata">
                    <img src={coin} className="currentcoins"></img>
                    <span className="grosscoin_value"> {userDetails.grosscoins}</span>

                    <div className="grosscoins_text">  Gross Coins</div>
                </div>
                <div>
                    <img src={Vector} className="vector"></img>
                    <img src={Vector1} className="vector1"></img>
                </div>

            </div>
            <div className="imagesection">
                <img src={Image2} className="centerimage" />
            </div>

            <div className="netcoins_section">
                <div className="button_section">
                    <img src={Vector2} className="vector2" />
                    <img src={Message} className="message" />
                    <img src={Forward} className="forward" />

                    <div></div>
                    <button className="leadbutton " onClick={updateCoins}>
                        Lead+100
                    </button>
                </div>
                <div className='interested_text'>50 interested</div>
                <div className="netcoin_timer">
                    <img src={Image3} className="picture3" />

                    <div> <img src={coin} className="coin1" />
                        <span className="netcoins"> {userDetails.netcoins}</span>
                        <img src={Vector} className=""></img>
                        <div className='currentleadname'>{userDetails.name}terry_dias    <span className="in_lead_text">in Lead</span></div>
                    </div>
                    <div></div>
                    <div> <h3 className="time">{timer}</h3></div>
                </div>
                <div>
                    <span>@{UserData.name}....</span>
                    <span className="contenttext"> If everything seems under control, you're</span>
                    <span className="contenttext">going fast enough. Be Fast, Be Curious..! 😎</span>
                </div>

            </div>
        </div>
    )
}
