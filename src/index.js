const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config({
    path:path.join(__dirname,".env")
});
mongoose.pluralize(null);

const PORT = process.env.PORT || 0 
const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI);
(async()=>{
    try{mongoose.connect(MONGODB_URI);
        console.log(`Connectedto MONGODB at URI of : ${
            MONGODB_URI}`)
    }catch(e){
        console.log("Cant connect to MONGODB")
        console.log(e.message);
        process.exit(14);
    }
    const ser = express().use(morgan())
    .use(express.json()).use(express.urlencoded())
    .get("/about",(req, res,next)=>{
        res.json({
            name:"mahMoud zaky",
            lastName:"Fetoh", 
            email:"zaky.Fetoh@gmail.co",
        })
    }).listen(PORT,()=>{
        console.log(`Blog Ser Is ${ser.address().port}`)
    })
})()