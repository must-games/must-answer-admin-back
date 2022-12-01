const express = require('express')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const watchList = require('../config/watchList')
const { ENV_MODE, MODE } = require('../config/config')
const resourceFiles = require('../config/quizpackFiles')

const server_list =
    ENV_MODE === MODE.PROD
        ? watchList.server_list
        : ENV_MODE === MODE.TEST
        ? watchList.test_server_list
        : watchList.dev_server_list

const tempFileDir = (() => {
    switch (ENV_MODE) {
        case MODE.PROD:
            return '/tmp' //needs check PROD env
        case MODE.TEST:
            return '/tmp'
        default:
            return 'd:\\temp'
    }
})()

const app = express()

// Get webserver-list
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

// get files info for quizpack resource
app.get('/files-info', (req, res) => {
    const baseDir = path.join('H:', 'ktquiz_dev', 'nginx-1.20.2', 'html', 'data')

    let revision = null
    try {
        const revisionTxtPath = path.join(baseDir, 'revision.txt')
        console.log('revisionTxtPath: ', revisionTxtPath)
        revision = Number(fs.readFileSync(revisionTxtPath, 'utf8'))
        console.log('revision: ', revision)
    } catch (err) {
        res.status(404)
        revision = 'ENOENT'
    }

    let filesInfo = []
    resourceFiles.map((file) => {
        let fileInfo = {}
        try {
            fileInfo = moment(fs.statSync(path.join(baseDir, file)).mtime).format(
                'YYYY-MM-DD HH:mm:ss'
            )
        } catch (err) {
            res.status(404)
            fileInfo = 'ENOENT'
        }

        filesInfo.push({
            name: file,
            mTime: fileInfo,
        })
    })

    // const quiz0 = fs.statSync(path.join(baseDir, 'quiz0.csv'))
    // const now = new Date()
    // const nowMoment = moment()
    // const nowFormat = nowMoment.format('YYYY-MM-DD hh:mm:ss')
    // const quiz0Format = moment(quiz0.mtime).format('YYYY-MM-DD HH:mm:ss')

    res.send({
        // title: 'files info base on /backapi/quizpack-files/files-info',
        revision: revision,
        filesInfo: filesInfo,
    })
})

module.exports = app
