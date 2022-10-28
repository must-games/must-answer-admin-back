const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const querystring = require('node:querystring')
const { BACKEND_PORT } = require('./config/config')
const debugging = require('./debugging')
const healthCheck = require('./healthCheck')

// Read/Set Config
const backendPort = BACKEND_PORT

// Set Exxpress
const app = express()
app.use(express.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(express.json()) // parsing application/json
app.use(cors()) // CROS
app.use(cookieParser()) // cookie-parser
app.use(fileUpload()) // Prepare File-Upload

// works only if envMode == MODE.DEV or MODE.TEST. See config.js
app.post('/backapi', (req, res) => debugging.rootPath(req, res))
app.get('/backapi', (req, res) => debugging.rootPath(req, res))
app.post('/backapi/viewCookie', async (req, res) => debugging.viewCookie(req, res))
app.post('/backapi/viewSession', async (req, res) => debugging.viewSession(req, res))

// get Server list and Status (req and res have JSON data)
app.get('/backapi/server', async (req, res) => healthCheck.server_status(req, res))

// Listening on port
app.listen(backendPort, () => {
    console.log(`listening on port ${backendPort}`)
})
