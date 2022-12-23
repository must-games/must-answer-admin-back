const path = require('path')
const { prod_server_list, test_server_list, dev_server_list } = require('./resources/serverList')

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

const BACKEND_PORT = 9999

const SERVER_LIST = (() => {
    switch (ENV_MODE) {
        case MODE.DEV:
            return dev_server_list
        case MODE.TEST:
            return test_server_list
        case MODE.PROD:
            return prod_server_list
        default:
            console.log('ENV_MODE is not properly set. Check config.js')
            process.exit(1)
    }
})()

/** set REDIS_SERVER hostname/IP ADDRESS
 */
const REDIS_SERVER = (() => {
    switch (ENV_MODE) {
        case MODE.DEV:
            return {
                host: '127.0.0.1',
                port: 6379,
            }
        case MODE.TEST:
            return {
                host: '127.0.0.1',
                port: 6379,
            }
        case MODE.PROD:
            return {
                host: '10.220.204.189',
                port: 6379,
            }
        default:
            console.log('ENV_MODE is not properly set. Check config.js')
            process.exit(1)
    }
})()

const TEMP_FILE_DIR = (() => {
    switch (ENV_MODE) {
        case MODE.PROD:
            return '/tmp' // KT Server: CentOS
        case MODE.TEST:
            return '/tmp' // AWS EC2 : 
        default:
            return 'd:\\temp'  // Simon's Local PC
    }
})()

const BASE_DIR = (() => {
    switch (ENV_MODE) {
        case MODE.PROD:
            return path.join('/nginx', 'app', 'nginx-1.20.1', 'html', 'data')
        case MODE.TEST:
            return path.join('/nginx', 'app', 'nginx-1.20.1', 'html', 'data')
        default:
            return path.join('H:', 'ktquiz_dev', 'nginx-1.20.2', 'html', 'data')
    }
})()

console.log('ENV_MODE ', ENV_MODE, ' MODE ', MODE)

module.exports = {
    MODE,
    ENV_MODE,
    BACKEND_PORT,
    SERVER_LIST,
    REDIS_SERVER,
    TEMP_FILE_DIR,
    BASE_DIR,
}
