const redisClient = require("./redis-client");
const mongoose = require("mongoose");

const origiExec = mongoose.Query.prototype.exec


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
    const Qkey =  CollName + JSON.stringify(this.getFilter());
    console.log( Qkey)


    const outPut = await origiExec.apply(this, arguments);

    console.log(outPut);

    return outPut
}




