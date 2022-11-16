const express = require('express')
const watchList = require('../config/watchList')
const { ENV_MODE, MODE } = require('../config/config')

const server_list =
    ENV_MODE === MODE.PROD
        ? watchList.server_list
        : ENV_MODE === MODE.TEST
        ? watchList.test_server_list
        : watchList.dev_server_list

const app = express()

app.get('/webserver-list', async (req, res) => {
    const webServers = server_list.filter((server) => server.category === 'Web-Proxy')

    res.send({
        title: 'webserver-list',
        webServers: webServers,
    })
})

// Hello for test & healthcheck
app.get('/hello', async (req, res) => {
    const url = req.url,
        cookie = req.cookies,
        body = req.body

    res.send({
        title: 'hello on /backapi/quizpack/',
        url: url,
        cookie: cookie,
        body: body,
    })
})

module.exports = app
