// to test this file separately
//const express = require("express");
// const app = express();
//app.listen(3002, function () {
//  console.log("Server on port 3002");
//});
//app.get("/", authentication_fn);

const { spawn } = require("child_process");

function email_verification(email) {
  return new Promise((resolve, reject) => {
    const process = spawn("python3", ["./authentication_hepler.py", email]);

    let res = "";
    process.stdout.on("data", (data) => {
      res += data.toString();
    });

    process.stderr.on("data", (data) => {
      console.error("stderr: ${data}");
      reject(new Error("stderr: ${data}"));
    });

    process.on("close", (flag) => {
      if (flag === 0) {
        resolve(res);
      } else {
        reject(new Error("Process existed with ${flag}"));
      }
    });
  });
}

module.exports = { email_verification };

/*function authentication_fn(req, res) {
  const spawn = require("child_process").spawn;
  let temp = "";
  const process = spawn("python3", ["./authentication_helper.py"]);
  process.stdout.on("data", function (data) {
    temp += data.toString();
    res.send(data.toString());
  });

  process.on("close", (code) => {
    console.log(temp);
    return temp;
  });
}
*/
