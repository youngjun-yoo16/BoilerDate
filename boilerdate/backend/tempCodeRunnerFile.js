require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());
console.log(process.env.TWILIO_ID);
console.log(process.env.TWILIO_TOKEN);
const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

app.post('/send-message', (req, res) => {
    const { to, body } = req.body;

    client.messages
        .create({
            body: body,
            to: to,
            from: '+18333092042',
        })
        .then((message) => res.status(200).send({ success: true, messageSid: message.sid }))
        .catch((error) => res.status(500).send({ success: false, error: error.message }));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Send a message immediately when the server starts
    client.messages
        .create({
            body: 'Hello, this is a test message!',
            to: '+17657671361', // Replace with the recipient's phone number
            from: '+18333092042', // Replace with your Twilio phone number
        })
        .then((message) => console.log(`Message sent with SID: ${message.sid}`))
        .catch((error) => console.error(`Failed to send message: ${error.message}`));
});




