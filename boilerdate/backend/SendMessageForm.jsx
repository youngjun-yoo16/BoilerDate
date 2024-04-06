import React, { useState } from 'react';
import axios from 'axios';

function SendMessageForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const response = await axios.post('http://localhost:3001/send-message', {
                to: phoneNumber,
                body: message,
            });
            console.log(response.data);
            alert('Message sent successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to send message.');
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={sendMessage}>
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}

export default SendMessageForm;