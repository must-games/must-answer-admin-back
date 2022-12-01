const express = require('express')
const fileUpload = require('express-fileupload')
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

// Prepare File-Upload
app.use(
    fileUpload({
        defParamCharset: 'utf8',
        createParentPath: true,
        limits: { fileSize: 1024 * 1024 },
        useTempFiles: true,
        tempFileDir: tempFileDir,
    })
)

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
        title: 'echo hello on /backapi/quizpack-files/',
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

// File Upload (basic implementation, 22-11-29)
app.post('/upload', (req, res) => {
    let uploadFile
    let uploadPath

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
    }

    // The name of the input field (i.e. "uploadFile") is used to retrieve the uploaded file
    uploadFile = req.files.uploadFile
    uploadPath = path.join(__dirname, '../../..', 'upload', uploadFile.name)
    console.log('temp file Path', uploadFile.tempFilePath)
    console.log('uploadFile.name', uploadFile.name)
    console.log('__dirname', __dirname)
    console.log('uploadPath', uploadPath)

    // Use the mv() method to place the file somewhere on your server
    uploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err)

        fs.chmodSync(uploadPath, 0o666) // remove execute mode on Linux/Unix
        res.json(fs.readFileSync(uploadPath, 'utf8'))
    })
})

module.exports = app
