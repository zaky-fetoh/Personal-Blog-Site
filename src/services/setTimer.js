exports.usetimer = (req, res, next)=>{
    req.InTime = Date.now()
    req.getReqTime = ()=>{
        return Date.now() - req.InTime;}
    next()
}

