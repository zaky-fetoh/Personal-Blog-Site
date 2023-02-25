const mongoose = require("mongoose");
const express = require("express");
const path = require("path")
require("dotenv").config({
    path:path.join(__dirname,".env")
});
mongoose.pluralize(null);

const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI);
(async()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log(`Connectedto MONGODB at URI of : ${MONGODB_URI}`)
    }catch(e){
        console.log("Cant connect to MONGODB")
        console.log(e.message);
        process.exit(14);
    }
})()