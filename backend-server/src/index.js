const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env")
});

require("./services/caching-quary");
require("./services/caching-jwt");

const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
mongoose.pluralize(null);
const cors = require('cors');


const userRoutes = require("./routes/user")
const blogRoutes = require("./routes/blog")

const TimerMiddleware = require("./services/setTimer");

const contAuth = require("./controller/Auth")


const PORT = process.env.PORT || 0
const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI);
(async () => {
    try {
        mongoose.connect(MONGODB_URI);
        console.log(`Connectedto MONGODB at URI of : ${MONGODB_URI}`)
    } catch (e) {
        console.log("Cant connect to MONGODB")
        console.log(e.message);
        process.exit(14);
    }
    const ser = express().use(TimerMiddleware.usetimer).use(morgan())
        .use(express.json()).use(express.urlencoded()).use(cors())
        .use("/user", userRoutes)
        .use("/blog", contAuth.vertify, blogRoutes)
        .post("/login", contAuth.Login)
        .get("/verify", contAuth.vertify,(req,res)=>res.status(200).json({
                ok:true,}))

        .listen(PORT, () => {
            console.log(`Blog Ser Is ${ser.address().port}`)
        })
})()