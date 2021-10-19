const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email:{
        type: String, required: true
    },
    phone:{
        type: String, required: true
    },
    country:{
        type: String, required: false
    },
    occupation:{
        type: String, required: false
    },
    password:{
        type: String
    },
    seed:{
        type: String
    },
    address:{
        type: String
    },
    privatekey:{
        type: String
    },
    publickey:{
        type: String
    }
})

module.exports =  mongoose.model('User', userSchema)