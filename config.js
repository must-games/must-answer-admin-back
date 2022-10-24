const DEV_MODE = true;
const BACKEND_PORT = 8888;
const REDIS_SERVER = {
  host: "127.0.0.1",
  port: 6379,
};

let devMode = false;
if (typeof DEV_MODE !== "undefined") {
  devMode = DEV_MODE || false;
}

module.exports = {
  devMode: devMode,
  backendPort: BACKEND_PORT,
  redisServer: REDIS_SERVER,
};
