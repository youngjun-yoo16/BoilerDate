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
  const process = spawn("python3", ["./authentication_helper.py"]);
  process.stdout.on("data", function (data) {
    res.send(data.toString());
  });

  const key =
    "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";

  //sgMail.setApiKey(key);

 /* const message = {
    to: "dennis42702@gmail.com",
    from: "jblee1152@gmail.com",
    subject: "this is a test emial. please verify your code",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    html: "<strong>easy come easy go will you let me go</strong>",
  };

  sgMail
    .send(message)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error(error);
    });*/
}
