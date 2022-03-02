const express = require("express")
const Router = express.Router()
const UserDetails = require("../controllers/userdetails")

// Router.post("/userdetails", UserDetails.UserSignUp)
Router.post("/userlogin", UserDetails.UserLogIn)
Router.get("/userdetails", UserDetails.getAllUserDetails)
Router.get("/topvaluer", UserDetails.getTopValuerDetails)

Router.put("/savecoins/:id", UserDetails.saveUpdateValues)
module.exports = Router;