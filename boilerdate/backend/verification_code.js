require('dotenv').config();

const express = require('express')
const nodemailer = require('nodemailer');
const app = express()

// portnumber
const port = 3002

app.listen(port, () => {
  console.log(`Is listening at http://localhost:${port}`)
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    }
});

async function sendVerificationEmail(email, verificationCode) {
    try {
        mailOptions = {
            from: 'boilerdate@gmail.com',
            to: email,
            subject: 'Boilerdate Account Creation Email Verification',
            text: `Your verification code is: ${verificationCode}`
          };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification code sent: ', info.response);
    } catch (error) {
        console.log('Error occurred while sending code.');
    }
}


function generateVerificationCode() {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Example usage
const verificationCode = generateVerificationCode();
const userEmail = '';

sendVerificationEmail(userEmail, verificationCode);
