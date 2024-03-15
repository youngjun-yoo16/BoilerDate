require("dotenv").config();
const nodemailer = require("nodemailer");
// import email verification fn

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.CLIENT_ID,
  },
});

async function sendNotificationEmail(email) {
  try {
    mailOptions = {
      from: "boilerdate@gmail.com",
      to: email,
      subject: "Boilerdate Account Creation Email Verification",
      text: `Someone liked you!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Like notification sent: ", info.response);

    return true;
  } catch (error) {
    console.log("Error occurred while sending notification.", error);

    return false;
  }
}
