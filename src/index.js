require("./services/caching")

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
mongoose.pluralize(null);

require("dotenv").config({
    path:path.join(__dirname,".env")});

const userRoutes = require("./routes/user")
const blogRoutes = require("./routes/blog")

const TimerMiddleware = require("./services/setTimer");

const contAuth = require("./controller/Auth")


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
    const ser = express().use(TimerMiddleware.usetimer).use(morgan())
    .use(express.json()).use(express.urlencoded())
    .use("/user", userRoutes)
    .use("/blog",contAuth.vertify, blogRoutes)
    .post("/login", contAuth.Login)
    .get("/verify", contAuth.vertify)

    .listen(PORT,()=>{
        console.log(`Blog Ser Is ${ser.address().port}`)
    })
})()