const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    userName:{
        type: mongoose.Schema.Types.String, 
        minLength:4, maxLength:8, unique: true, 
        index: true, required: true,
    },
    password:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
})

module.exports = mongoose.model("users", userSchema);