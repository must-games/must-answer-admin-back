const Redis = require("ioredis");
const redisServer = require("./config/config").redisServer;
const redis = new Redis({
  port: redisServer.port,
  host: redisServer.host,
});

async function getSession(key) {
  const value = await redis.get(key);
  return value;
}

async function setKeyValue(key, value) {
  await redis.set(key, value);
}

async function isAuth(key) {
  return (await redis.get(key)) ? true : false;
}

module.exports = {
  getSession,
  setKeyValue,
  isAuth,
};
