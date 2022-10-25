const tcpp = require('tcp-ping')
const config = require('./config/config')
const watchList = require('./config/watchList')

const isDevMode = config.hasOwnProperty('devMode') ? config.devMode : false
const server_list = isDevMode ? watchList.dev_server_list : watchList.test_server_list

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
        checkedList.push({
            ...server,
            isAlive: isAlive,
        })
    }
    return checkedList
}

// (async () => {
//     let result_list = []
//     result_list = await server_check(server_list)
//     console.log('result_list:', result_list)
// })()

async function server_status(req, res) {
    if (!req.body.hasOwnProperty('address') || !req.body.hasOwnProperty('port')) {
        res.send(await server_check(server_list))
    } else {
        const server = [
            {
                address: req.body.address,
                port: req.body.port,
            },
        ]
        res.send(await server_check(server))
    }
}

module.exports = {
    server_status,
}
