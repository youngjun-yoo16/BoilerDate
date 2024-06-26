require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.CLIENT_ID,
  },
});

async function sendUpdateEmail(email, info) {
  let text = "The following updates have been made in our app:\n\t";
  text += info;
  try {
    mailOptions = {
      from: "boilderdate@gmail.com",
      to: email,
      subject: "[BoilerDate] New Updates!",
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`notification sent: `, result.response);

    return true;
  } catch (error) {
    console.log("Error occurred while sending notification.", error);

    return false;
  }
}

module.exports = {
  sendUpdateEmail,
};
