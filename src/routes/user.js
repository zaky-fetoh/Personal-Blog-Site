const express = require("express");

const contUser = require("../controller/users");
const contAuth = require("../controller/Auth");


module.exports = express.Router()
    .post("/",contUser.addUser)
    .put("/", contAuth.vertify ,contUser.editUser)
    .delete("/", contAuth.vertify,contUser.deleteUser)
