require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.CLIENT_ID,
  },
});

async function sendPremiumEmail(email, name, age, gender, interests) {
  let text = "Login to our app to be matched with someone like this:\n\n";
  text += "\tName: " + name + "\n";
  text += "\tAge: " + age + "\n";
  text += "\tGender: " + gender + "\n";
  text += "\tInterests: " + interests + "\n";

  try {
    mailOptions = {
      from: "boilderdate@gmail.com",
      to: email,
      subject: "[BoilerDate] Attention!",
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
  sendPremiumEmail,
};
