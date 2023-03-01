const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const REDIS_URI = process.env.REDIS_URI;

const origiExec = mongoose.Query.prototype.exec

await (async()=>{




const redisClient = await (redis.createClient({
    url: REDIS_URI,
}).connect())

const Rget = util.promisify(redisClient.get).bind(redisClient);
const Rset = util.promisify(redisClient.set).bind(redisClient);

mongoose.Query.prototype.cachable = function () {
    this.useCache = true;
    return this
}

mongoose.Query.prototype.exec = async function () {

    /******
     * this metod uses a radis cash it goes as follows
     * * if this quary is not cachable original flow and returns
     * * if that qaury, which is defined by the quary option, is 
     * *    is cached :: we'll return the cached results
     * * else 
     * * * Run original qaury
     * * * Cach the result 
     * * * return the result
     */

    // if (!this.useCache)
    //     return origiExec.apply(this, arguments)

    // this.getOptions()
    const CollName = this.model.collection.collectionName;
    const Qkey = JSON.stringify({ ...this.getFilter(), CollName });

    try {
        const value = await Rget(Qkey)
        console.log(value)
    } catch (e) {
        console.log(e.message)
    }

    const outPut = await origiExec.apply(this, arguments);

    return outPut
}
})()