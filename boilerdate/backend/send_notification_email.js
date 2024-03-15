require("dotenv").config();
const nodemailer = require("nodemailer");

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
      from: "boilderdate@gmail.com",
      to: email,
      subject: "[BoilerDate] New Like Alert: Someone's Interested in You!",
      text: "You've Caught Someone's Eye! Find Out Who...",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Like notification sent: ", info.response);

    return true;
  } catch (error) {
    console.log("Error occurred while sending notification.", error);

    return false;
  }
}

module.exports = {
  sendNotificationEmail,
};
