require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.CLIENT_ID,
  },
});

async function sendNotificationEmail(email, type) {
  try {
    const subject = "";
    const text = "";
    type === "like"
      ? ((subject =
          "[BoilerDate] New Like Alert: Someone's Interested in You!"),
        (text = "You've Caught Someone's Eye! Find Out Who..."))
      : ((subject =
          "[BoilerDate] Match Made: Discover Your Latest Connection!"),
        (text = "Exciting News: You Have a New Match! See Who It Is..."));

    mailOptions = {
      from: "boilderdate@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`${type} notification sent: `, info.response);

    return true;
  } catch (error) {
    console.log("Error occurred while sending notification.", error);

    return false;
  }
}

module.exports = {
  sendNotificationEmail,
};
