const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const querystring = require("node:querystring");
const session = require("./session");
const config = require("./config");
const debugging = require("./debugging");

// Read/Set Config
const devMode = config.hasOwnProperty("devMode") ? config.devMode : false;
const backendPort = config.hasOwnProperty("backendPort") ? config.backendPort : 8888;

// Set Exxpress
const app = express();
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parsing application/json
app.use(cors()); // CROS
app.use(cookieParser()); // cookie-parser
app.use(fileUpload()); // Prepare File-Upload

// IS it dev-mode?
if (devMode) {
  console.log("devMode ", devMode);
}

app.post("/backapi", (req, res) => {
  const url = req.url;
  const cookie = req.cookies;
  const body = req.body;
  console.log("url: ", url);
  console.log("cookie: ", cookie);
  console.log("body: ", body);
  res.send({
    title: "hello on POST",
    url: url,
    cookie: cookie,
    body: body,
  });
});

app.get("/backapi", (req, res) => {
  const url = req.url;
  const cookie = req.cookies;
  const body = req.body;
  console.log("url: ", url);
  console.log("cookie: ", cookie);
  console.log("body: ", body);
  res.send({
    title: "hello on GET /backapi",
    url: url,
    cookie: cookie,
    body: body,
  });
});

// DevMode only
app.post("/backapi/viewCookie", async (req, res) => debugging.viewCookie(req, res));
app.post("/backapi/viewSession", async (req, res) => debugging.viewSession(req, res));

app.listen(backendPort, () => {
  console.log(`listening on port ${backendPort}`);
});
