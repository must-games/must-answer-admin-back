const tcpp = require('tcp-ping')
const watchList = require('./config/watchList')
const { ENV_MODE, MODE } = require('./config/config')

const server_list =
    ENV_MODE === MODE.PROD
        ? watchList.server_list
        : ENV_MODE === MODE.TEST
        ? watchList.test_server_list
        : watchList.dev_server_list

const promisedProbe = (server) => {
    return new Promise((resolve, reject) => {
        tcpp.probe(server.address, server.port, (err, isAlive) => {
            if (!err) {
                resolve(isAlive)
            }
            reject(false)
        })
    })
}

async function server_check(server_list) {
    const checkedList = []
    for (const server of server_list) {
        const isAlive = await promisedProbe(server)
        const { port, ...rest } = server
        checkedList.push({
            ...rest,
            isAlive: isAlive,
        })
    }
    return checkedList
}

async function server_status(req, res) {
    const address = req.query.address
    const port = req.query.port
    if (!address || !port) {
        res.send(await server_check(server_list))
    } else {
        const server = [{ address, port }]
        res.send(await server_check(server))
    }
}

module.exports = {
    server_status,
}
