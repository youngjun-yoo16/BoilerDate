require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

async function sendNotificationText(number, type) {
    try {
        const messageBody = type === 'like' ? 'You have a new like!' : 'You have a new match!';
        const message = await client.messages.create({
            body: messageBody,
            to: number, // Assuming 'number' is an object with a 'phone' property
            from: '+18333092042', // Replace with your Twilio phone number
        });
        console.log(`Message sent with SID: ${message.sid}`);
        return true;
    } catch (error) {
        console.error(`Failed to send message: ${error.message}`);
        return false;
    }
}




module.exports = {
    sendNotificationText,
  };