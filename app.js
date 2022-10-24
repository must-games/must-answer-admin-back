const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const querystring=require('node:querystring')
const session=require('./session')
const config = require('./config')


// Read/Set Config
const devMode = config.hasOwnProperty('devMode') ? config.devMode : false
const backendPort = config.hasOwnProperty('backendPort') ? config.backendPort : 8888

// Set Exxpress
const app = express() 
app.use(express.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(express.json());  // parsing application/json
app.use(cors())           // CROS
app.use(cookieParser());  // cookie-parser
app.use(fileUpload());    // Prepare File-Upload

// IS it dev-mode?
if (devMode) {
  console.log('devMode ', devMode)
}

app.post('/backapi', (req, res)=>{
  const url = req.url
  const cookie = req.cookies;
  const body = req.body;
  console.log('url: ', url)
  console.log('cookie: ', cookie)
  console.log('body: ', body)
  res.send({
    title: "hello on POST",
    url: url,
    cookie: cookie,
    body: body
  })
})

app.get('/backapi', (req, res)=>{
  const url = req.url
  const cookie = req.cookies
  const body = req.body
  console.log('url: ', url)
  console.log('cookie: ', cookie)
  console.log('body: ', body)
  res.send({
    title: "hello on GET /backapi",
    url: url,
    cookie: cookie,
    body: body
  })
})

app.post('/backapi/viewSession', async (req, res)=>{  
  const url = req.url
  const cookie = req.cookies
  const body = req.body

  try {
    if (!devMode) throw new Error('viewSession API is for Dev Mode')
    const authSession = cookie['auth-session'] // get auth-session(key) from cookie
    if (!authSession) throw new Error('No Auth Session Key in Cookie')

    const checkAuthSession = await session.isAuth(authSession)
    if(!checkAuthSession) throw new Error('No Auth Session Value on SessionStorage')

    const sessionValue = await session.getSession(authSession)  // get session value(BASE64) from REDIS
    const decodedSession = Buffer.from(sessionValue, 'base64').toString('utf-8') // BASE64 Decoding
    const parsedSession = querystring.parse(decodedSession)
  
    res.send({
      title: "hello on POST /backapi/viewSession",
      url: url,
      cookie: cookie,
      body: body,
      authSession: authSession,
      sessionValue: sessionValue,
      decodedSession: decodedSession,
      parsedSession: parsedSession
    })
  } catch (err) {
    console.error(err)
    res.send({
      error: true,
      title: err.message + ' on POST /backapi/viewSession',
      url: url,
      cookie: cookie,
      body: body
    })
  }
})

app.listen(backendPort, () => {
  console.log(`listening on port ${backendPort}`)
})