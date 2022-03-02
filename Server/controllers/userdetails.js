
const UserData = require('../models/userdetails')

exports.getAllUserDetails = (req, res) => {
    const filter = { name: req.body.name }

    UserData.find(filter)
        .then((result) => {
            res
                .status(200)
                .json({ message: "data fetched successfully", data: result })
        })
        .catch((error) => {
            res.status(500).json({ message: "Error in database", error: error })
        })
}
exports.getTopValuerDetails = (req, res) => {

    UserData.find()
        .limit(1)
        .sort({ netcoins: -1 })
        .then((result) => {
            res
                .status(200)
                .json({ message: "data fetched successfully", data: result[0] })
        })
        .catch((error) => {
            res.status(500).json({ message: "Error in database", error: error })
        })
}
// if (result.length > 0) {
//             res.status(400).json({
//                 message: "user already registered, please login to continue",
//             })
//         }
//         else {
//             UserObj.save().then((result) => {

//                 res.status(200).json({
//                     message: "user registred successfully",
//                     UserData: result
//                 })
//             })




exports.UserLogIn = (req, res) => {
    const { name, username } = req.body

    UserData.find({ name: name, username: username })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "user Loggedin Successfully",
                    isLoggedIn: true,
                    UserData: result,
                })
            } else {
                const UserObj = new UserData({

                    name: name, username: username
                })
                UserObj.save().then((result) => {

                    res.status(200).json({
                        message: "user registred successfully",
                        UserData: result
                    })

                    // res.status(400).json({
                    //     message: "either Email or Password is wrong",
                    //     isLoggedIn: false,
                })
            }
        })


        .catch((err) => {
            res.status(500).json({
                message: "error in data base",
                Error: err,
            })
        })
}

exports.saveUpdateValues = (req, res) => {


    UserData.updateOne({ "_id": req.params.id }, // Filter
        {
            $set: {
                netcoins: req.body.netcoins,
                grosscoins: req.body.grosscoins
            }
        }).then((result) => {
            res
                .status(200)
                .json({ message: "data fetched successfully", data: result })
        })
        .catch((error) => {
            res.status(500).json({ message: "Error in database", error: error })
        })
}











//     req.body.name + "|" + req.body.username + "|" + req.body.netcoins + "|" + req.body.grosscoins
//     )
//     if (new_coins.name == req.body.name) {
//         console.log("inside true")
//         const details = new Details({
//             name: req.body.name,
//             username: req.body.username,
//             netcoins: req.body.netcoins,
//             grosscoins: req.body.grosscoins
//         })
//         console.log(details)
//         details.save(function (err, new_coins) {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).send("Some Problem Occured")
//             }
//             res.send({ details: new_coins })
//         })
//         // return res.send('success');
//     } else {
//         return res.send("failed")
//     }
// }