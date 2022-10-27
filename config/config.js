const MODE = {
    DEV: 0, // Developing Env on Developer Machine
    TEST: 1, // Testing Env on Test Server
    PROD: 2, // Production Env
}
Object.freeze(MODE)
/** set ENV_MODE according to the staging phase
 */
const ENV_MODE = MODE.DEV
// const ENV_MODE = MODE.TEST
// const ENV_MODE = MODE.PROD

/** set REDIS_SERVER hostname/IP ADDRESS
 */
const REDIS_SERVER = {
    host: '127.0.0.1',
    port: 6379,
}
const BACKEND_PORT = 9999

module.exports = {
    MODE,
    ENV_MODE,
    BACKEND_PORT,
    REDIS_SERVER,
}
