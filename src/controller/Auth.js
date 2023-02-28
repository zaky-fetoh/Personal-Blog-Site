const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const UserModel = require("../model/users");


const JWT_KEY = process.env.JWT_SECRIT;
const ExpInTime = "3h";

jwt.sign = require("util").promisify(jwt.sign); 
jwt.verify = require("util").promisify(jwt.verify);

exports.Login = async(req, res, next)=>{
    /********
     * Route: /login
     * Method: POST
     * inputt: {userName, password}
     * output:{ JWT_token} this token will Expire after $ExpIn
     * this method Check the user password if correct it
     *  return The JWT token
     *********/
    const userDoc = await UserModel.findOne({
        userName: req.body.userName,
    }, {__v:0});
    try{if(!userDoc) throw new Error("This user Does Not Exist");
        if(await bcrypt.compare(req.body.password,userDoc.password)){
            const token = await jwt.sign({
                user_id:userDoc._id, 
            },JWT_KEY,{expiresIn:ExpInTime});
            res.status(200).json({
                JWT_Token: token, 
                ok: true, message:"Login Sucess",
            })
        }else throw new Error("Incorrect USER or PASS");
    }catch(e){
        res.status(500).json({
            ok:false, message: e.message,
        })
    }
}

exports.vertify = async(req, res, next)=>{
    /*********
     * this method is used as gard usedto verify the
     * the Authorization headerofthe request.
     * the JWT token is attachedto Autherization header
     * OUt: it'll Return {ok:false, message: "invalid Token",}
     * for invalid Token.
     * else if the token is validit will forward the Excution 
     * to the NextMiddleWare.
     *******/

    const jtoken = req.headers["authorization"].split(" ")[1];
    try{
        const decodedToken = await jwt.verify(jtoken, JWT_KEY);
        req.user_id = decodedToken.user_id;
        next();
    }catch(e){
        return res.status(402).json({
            ok:false, message: "invalid Token",
        });
    }
};