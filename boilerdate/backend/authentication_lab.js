const { spawn } = require("child_process");

function email_verification(email) {
  return new Promise((resolve, reject) => {
    const process = spawn("python3", ["authentication_helper.py", email]);

    let res = "";
    process.stdout.on("data", (data) => {
      res += data.toString();
    });

    process.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(new Error(`stderr: ${data}`));
    });

    process.on("close", (flag) => {
      if (flag === 0) {
        resolve(res);
      } else {
        reject(new Error(`Process existed with ${flag}`));
      }
    });
  });
}

// now this email_verification can be called in different files
module.exports = { email_verification };
