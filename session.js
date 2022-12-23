const Redis = require('ioredis')
const { REDIS_SERVER } = require('./config')
const redis = new Redis({
    port: REDIS_SERVER.port,
    host: REDIS_SERVER.host,
})

async function getSession(key) {
    const value = await redis.get(key)
    return value
}

async function setKeyValue(key, value) {
    await redis.set(key, value)
}

async function isAuth(key) {
    return (await redis.get(key)) ? true : false
}

module.exports = {
    getSession,
    setKeyValue,
    isAuth,
}
