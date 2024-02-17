// this is a temp file for testing calling python func in js

// index.js already creates a server. i need to use that here

const express = require("express");
const app = express();
//const sgMail = require("@sendgrid/mail");

app.listen(3002, function () {
  console.log("Server on port 3002");
});

app.get("/", authentication_fn);

// api key: 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

function authentication_fn(req, res) {
  const spawn = require("child_process").spawn;
  let temp = "";
  const process = spawn("python3", ["./authentication_helper.py"]);
  process.stdout.on("data", function (data) {
    temp += data.toString();
    res.send(data.toString());
  });

  // all of the output from the previous operations
  process.on("close", (code) => {
    console.log(temp);
    return temp;
  });
}
