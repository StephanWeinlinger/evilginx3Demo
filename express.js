const https = require("https");
const express = require("express");
const fs = require("fs");
const JavaScriptObfuscator = require("javascript-obfuscator");

const app = express();

app.get("/", (req, res) => res.sendFile(`${__dirname}/www/index.html`));

app.get("/script.js", (req, res) =>
  res.send(
    JavaScriptObfuscator.obfuscate(fs.readFileSync("www/script.js", "utf-8"), {
      compact: false,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1,
      renameGlobals: true,
    }).getObfuscatedCode()
  )
);

const credentials = {
  key: fs.readFileSync("cert/swtest.key", "utf-8"),
  cert: fs.readFileSync("cert/swtest.crt", "utf-8"),
};
https.createServer(credentials, app).listen(443);
