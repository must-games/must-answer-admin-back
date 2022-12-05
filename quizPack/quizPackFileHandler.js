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
        revision = Number(fs.readFileSync(revisionTxtPath, 'utf8'))
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

    res.send({
        revision: revision,
        filesInfo: filesInfo,
    })
})

// File Upload
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
    }

    const baseDir = path.join('H:', 'ktquiz_dev', 'nginx-1.20.2', 'html', 'data')

    // The key of the formData.append('uploadFile'~) is used to retrieve the uploaded file
    const uploadFile = req.files.uploadFile
    const uploadPath = path.join(baseDir, uploadFile.name)

    // Use the mv() method to place the file somewhere on your server
    uploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err)

        fs.chmodSync(uploadPath, 0o666) // remove execute mode on Linux/Unix
        res.send({
            result: 'upload success',
            filePath: uploadPath,
        })
    })
})

// Update revision.txt
app.post('/updateRevision', (req, res) => {
    const { newRevision } = req.body

    const baseDir = path.join('H:', 'ktquiz_dev', 'nginx-1.20.2', 'html', 'data')
    let revision
    try {
        const revisionTxtPath = path.join(baseDir, 'revision.txt')
        fs.writeFileSync(revisionTxtPath, newRevision.toString() + '\r\n', 'utf8')
        revision = newRevision
    } catch (err) {
        res.status(500)
        revision = 'Error whild updating revision.txt'
    }

    res.send({
        revision: revision,
    })
})

// Update revision.txt
app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName

    const baseDir = path.join('H:', 'ktquiz_dev', 'nginx-1.20.2', 'html', 'data')
    const targetFile = path.join(baseDir, fileName)
    res.download(targetFile, function(err) {
        if(err) {
            console.error(err)
        }
    })
})

module.exports = app
