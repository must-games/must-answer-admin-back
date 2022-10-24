const config = require("./config");
const session = require("./session");
const querystring = require("node:querystring");
const ErrorMessage = require("./errorMessage");

const isDevMode = config.hasOwnProperty("devMode") ? config.devMode : false;

function rootPath(req, res) {
  const url = req.url,
    cookie = req.cookies,
    body = req.body;
  console.log("url: ", url);
  console.log("cookie: ", cookie);
  console.log("body: ", body);

  try {
    if (!isDevMode) throw new ErrorMessage.DevModeException("Not Dev Mode", "/");
    res.send({
      title: "hello on /backapi",
      url: url,
      cookie: cookie,
      body: body,
    });
  } catch (err) {
    console.error("Exception: ", err.message);
    res.status(err.status);
    res.send({
      error: true,
      title: err.message + " on POST /backapi",
      url: url,
      body: body,
    });
  }
}

async function viewCookie(req, res) {
  const url = req.url,
    cookie = req.cookies;

  try {
    if (!isDevMode) throw new ErrorMessage.DevModeException("Not Dev Mode", "viewCookie");
    res.send({
      title: "hello on POST /backapi/viewCookie",
      cookie: cookie,
    });
  } catch (err) {
    console.error("Exception: ", err.message);
    res.status(err.status);
    res.send({
      error: true,
      title: err.message + " on POST /backapi/viewCookie",
      url: url,
    });
  }
}

async function viewSession(req, res) {
  const url = req.url,
    cookie = req.cookies,
    body = req.body;

  try {
    if (!isDevMode) throw new ErrorMessage.DevModeException("Not Dev Mode", "viewSession");

    const authSession = cookie["auth-session"]; // get auth-session(key) from cookie
    if (!authSession) throw new ErrorMessage.UnAuthorized("No Session Info in Cookie");

    const checkAuthSession = await session.isAuth(authSession);
    if (!checkAuthSession) throw new ErrorMessage.UnAuthorized("No Session Ihfo on SessionStorage");

    const sessionValue = await session.getSession(authSession); // get session value(BASE64) from REDIS
    const decodedSession = Buffer.from(sessionValue, "base64").toString("utf-8"); // BASE64 Decoding
    const parsedSession = querystring.parse(decodedSession);

    res.send({
      title: "hello on POST /backapi/viewSession",
      url: url,
      cookie: cookie,
      body: body,
      authSession: authSession,
      sessionValue: sessionValue,
      decodedSession: decodedSession,
      parsedSession: parsedSession,
    });
  } catch (err) {
    console.error("Exception: ", err.message);
    res.status(err.status);
    res.send({
      error: true,
      title: err.message + " on POST /backapi/viewSession",
      url: url,
      body: body,
    });
  }
}

module.exports = {
  rootPath,
  viewCookie,
  viewSession,
};
