const redis = require("redis");

const REDIS_URI = process.env.REDIS_URI;


const redisClient = redis.createClient({
    url: REDIS_URI,
});

(async () => {
    await redisClient.connect();
})()

redisClient.on("error", (e) => {
    console.log(e.message);
    process.exit(20);
});

redisClient.on('ready', () => {
    console.log(`Redis Caching Server is Connected! at ${REDIS_URI}`);
});


module.exports = redisClient