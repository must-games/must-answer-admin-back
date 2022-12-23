const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const querystring = require('node:querystring')
const { BACKEND_PORT } = require('./config')
const debugging = require('./debugging')
const healthCheck = require('./healthCheck')
const quizPackFileHandler = require('./quizPack/quizPackFileHandler')
const quizPackFileHandler2 = require('./quizPack/quizPackFileHandler2')

// Set Exxpress
const app = express()
app.use(express.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(express.json()) // parsing application/json
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
 })) // CORS
app.use(cookieParser()) // cookie-parser


// works only if envMode == MODE.DEV or MODE.TEST. See config.js
app.post('/backapi', (req, res) => debugging.rootPath(req, res))
app.get('/backapi', (req, res) => debugging.rootPath(req, res))
app.post('/backapi/viewCookie', async (req, res) => debugging.viewCookie(req, res))
app.post('/backapi/viewSession', async (req, res) => debugging.viewSession(req, res))

// get Server list and Status (req and res have JSON data)
app.get('/backapi/server', async (req, res) => healthCheck.server_status(req, res))

// Quiz File List and Upload
app.use('/backapi/quizpack-files', quizPackFileHandler)
// Temporary quizPackFileHandler2 (for chekcing nginx proxy_pass with /w02/backapi2 )
app.use('/backapi2/quizpack-files', quizPackFileHandler2)

// Listening on port
app.listen(BACKEND_PORT, () => {
    console.log(`listening on port ${BACKEND_PORT}`)
})
