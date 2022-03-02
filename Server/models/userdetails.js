const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    name: {
        type: String,
        required: true

    },
    username: {
        type: String,
        required: true
    },
    netcoins: {
        type: Number,
        default: 0,
        required: true,
    },
    grosscoins: {
        type: Number,
        default: 0,
        required: true
    }
})

module.exports = mongoose.model('UserData', UserSchema, 'userdata');