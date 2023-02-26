const mongoose = require("mongoose");


const Blogs = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", required: true,
    },
    blog:{
        type:mongoose.Schema.Types.String,
        trim: true, minLength:3,
    },
}) 


module.exports = mongoose.model("blogs", Blogs);
