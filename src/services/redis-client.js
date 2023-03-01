const redis = require("redis");
const bluebird = require("bluebird");

const REDIS_URI = process.env.REDIS_URI;

// bluebird.promisifyAll(redis);   

module.exports =  redis.createClient({
        url: REDIS_URI,
    }).connect()