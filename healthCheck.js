const tcpp = require('tcp-ping')
const { SERVER_LIST } = require('./config')

// make promised version of tcpp.probe
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
    const { address, port } = req.query
    if (!address || !port) {
        res.send(await server_check(SERVER_LIST))
    } else {
        const server = [{ address, port }]
        res.send(await server_check(server))
    }
}

module.exports = {
    server_status,
}
