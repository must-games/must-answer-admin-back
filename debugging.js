const config = require("./config");
const session = require("./session");
const querystring = require("node:querystring");

const devMode = config.hasOwnProperty("devMode") ? config.devMode : false;

async function viewCookie(req, res) {
  const url = req.url;
  const cookie = req.cookies;

  try {
    if (!devMode) throw new Error("viewCookie API is for Dev Mode");
    res.send({
      title: "hello on POST /backapi/viewCookie",
      cookie: cookie,
    });
  } catch (err) {
    console.error(err);
    res.send({
      error: true,
      title: err.message + " on POST /backapi/viewCookie",
      url: url,
    });
  }
}

async function viewSession(req, res) {
  const url = req.url;
  const cookie = req.cookies;
  const body = req.body;

  try {
    if (!devMode) throw new Error("viewSession API is for Dev Mode");

    const authSession = cookie["auth-session"]; // get auth-session(key) from cookie
    if (!authSession) throw new Error("No Auth Session Key in Cookie");

    const checkAuthSession = await session.isAuth(authSession);
    if (!checkAuthSession) throw new Error("No Auth Session Value on SessionStorage");

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
    console.error(err);
    res.send({
      error: true,
      title: err.message + " on POST /backapi/viewSession",
      url: url,
      body: body,
    });
  }
}

module.exports = {
  viewCookie,
  viewSession,
};
