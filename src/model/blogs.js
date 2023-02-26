const mongoose = require("mongoose");


const Blogs = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    blog:{
        type:mongoose.Schema.Types.String,  
    },
}) 


module.exports = mongoose.model("blogs", Blogs);
