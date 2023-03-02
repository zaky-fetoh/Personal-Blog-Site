const jwt =  require("jsonwebtoken")
jwt.sign = require("util").promisify(jwt.sign); 
jwt.verify = require("util").promisify(jwt.verify);

const redisClient = require("./redis-client" )


const origiSign = jwt.sign; 
const TOKEN_CACHE_EX = 60*15;

jwt.sign = async function(){
    const useCache = arguments[2].useCache; 
    delete arguments[2].useCache ; 
    console.log(`cahchable token is ${useCache}`)
    if(!(useCache)) return await (origiSign.apply(this, arguments)) 
    
    const payloadkey = "JWT:" + JSON.stringify({...arguments[0]})

    const cachedjwt = await redisClient.get(payloadkey)
    if(cachedjwt) return cachedjwt;
    else{
        console.log("recalculating the token")
        const token =  await (origiSign.apply(this,arguments));
        (async()=>{
            await redisClient.set(payloadkey, token,{
                EX: TOKEN_CACHE_EX
            })
        })();
        return token;
    }
}