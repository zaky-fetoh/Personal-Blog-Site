const mongoose = require("mongoose");
const redisClient = require("./redis-client");

const origiExec = mongoose.Query.prototype.exec;

const CACHE_QUARY = 20;

mongoose.Query.prototype.cachable = function () {
    this.useCache = true;
    return this
};


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

    if (!this.useCache) return origiExec.apply(this, arguments)


    const CollName = this.model.collection.collectionName;
    const Qkey = JSON.stringify({ ...this.getFilter(), CollName });

    const value = await redisClient.get(Qkey)
    if (value) {
        const parsedCache = JSON.parse(value);
        if (Array.isArray(parsedCache)) return parsedCache.map(e => {
            return this.model(e)
        });
        else return this.model(parsedCache)
    }

    const outPut = await origiExec.apply(this, arguments);
    (async () => {
        await redisClient.set(Qkey, JSON.stringify(outPut), {
            EX: CACHE_QUARY,
        })
    })()
    return outPut
}