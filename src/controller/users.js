const UserModel = require("../model/users");
const bcrypt = require("bcrypt")

const HashPass = async (pswd) => {
    /*********
     * This Methodtake as input a plain text a return a digest of 
     * this text using bcrypthash Function
     ********/
     return await bcrypt.hash(pswd, 12);
}

exports.addUser = async (req, res, next) => {
    /*************  
     * Route: /user
     * Method: POST
     * INPUT: JSON doc as the UserMongoMode
     * OutRet: returns User 
     * This Method Hashes the User password
     * and stors It to the DB
     *******/
    const hashedPassword = await HashPass(req.body.password);
    const UserDoc = new UserModel({
        userName: req.body.userName,
        password: hashedPassword,
    })
    try {
        await (UserDoc.save());
    } catch (e) {
        return res.json({
            ok: false, message: e.message,
        })
    }
    return res.json({
        ok: true, User_id: UserDoc._id,
        message: "UserAdded",
        data: UserDoc,
    })
}

exports.editUser = async (req, res, next) => {
    /*******
     * Route: /user
     * Method: PUT
     * InputUser JSON Doc of the
     * old Info and New Info as Follows 
     * {oldUserName, OldPass, newUserName, newPassword}
     * 0utRet: return updatedUSer
     * this method is used to update user info
     ******/
    const userDoc = await UserModel.findOne({
        userName: req.body.oldUserName,
    }, { __v: 0, })
    try {
        if(userDoc) throw new Error("No User Found");
        if (await bcrypt.compare(req.body.oldPassword,
            userDoc.password)) {
            userDoc.userName = req.body.newUserName;
            userDoc.password =await HashPass(req.body.newPassword);
            await userDoc.save();
            res.status(200).json({
                ok: true, message: "user updated",
                data: userDoc._doc,
            })
        } else throw new Error("Incorrect password");
    } catch (e) {
        return res.status(500).json({
            ok: false, message: e.message,
        })
    }
}


exports.deleteUser = async(req, res, next)=>{ 
    /* ::::::::::::::
     * Route: /user/ 
     * Method: DELETE
     * INPUT: UserDoc as {userName, password}
     * 0utRet:  {ok, message}
     **********/
    const userDoc = await UserModel.findOne({
        userName: req.body.userName,
    }, { __v: 0, })
    try {
        if(userDoc) throw new Error("No User Found");
        if (await bcrypt.compare(req.body.password,
            userDoc.password)) {
            const result = await userDoc.delete(); 
            res.status(200).json({
                ok: true, message: "user deleted",
                data: result.deletedCount,
            })
        } else throw new Error("Incorrect password");
    } catch (e) {
        return res.status(500).json({
            ok: false, message: e.message,
        })
    }
}
