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
    title:{
        type:mongoose.Schema.Types.String,
        maxLength:30, trim: true,
    },
    blog:{
        type:mongoose.Schema.Types.String,
        trim: true, minLength:3,
    },
    time:{
        type:mongoose.Schema.Types.Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("blogs", Blogs);
