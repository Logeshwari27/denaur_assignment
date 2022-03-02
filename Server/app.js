const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const UserRoutes = require("./router/userData")
///mongodb connection

const mongoServer = process.env.MONGODB_URI || "mongodb://127.0.0.1/UserDatabase"
mongoose.connect(
    mongoServer,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("mongoDb connected")
    },
    (e) => console.log(error)
)


//app middleware
var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/user', UserRoutes)

// if (process.env.NODE_ENV == "production") {
//     app.use(express.static("zomato/build"))
//     const path = require("path")
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "zomato", "build", "index.html"))
//     })
// }

//listen to port


app.listen(process.env.PORT || 2222, () => {
    console.log("server Created")
})