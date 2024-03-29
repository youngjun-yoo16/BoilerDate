require("dotenv").config();
const nodemailer = require("nodemailer");
// import email verification fn
const { email_verification } = require("./authentication_lab");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.CLIENT_ID,
  },
});

async function verifyEmail(email) {
  try {
    const verification_res = await email_verification(email);
    if (!verification_res.includes("SUCCESS")) {
      console.error("Email verification failed: ", verification_res);
      throw new Error("Email verification failed");
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}
async function sendVerificationEmail(email, verificationCode) {
  try {
    // if reject, fn stops right here. else it continues to mail.
    const verification_res = await email_verification(email);
    if (!verification_res.includes("SUCCESS")) {
      // simply throw error message if fail
      console.error("Email verification failed: ", verification_res);
      throw new Error("Email verification failed");
    }

    mailOptions = {
      from: "boilerdate@gmail.com",
      to: email,
      subject: "Boilerdate Account Creation Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification code sent: ", info.response);

    return true;
  } catch (error) {
    console.log("Error occurred while sending code.", error);

    return false;
  }
}

function generateVerificationCode() {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

module.exports = {
  verifyEmail,
  sendVerificationEmail,
  generateVerificationCode,
};
