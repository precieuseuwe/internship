import Message from "../models/message.js";
const sendMessage = async (req, res) => {
    const { username, message } = req.body;
    console.log('recieving message');
    try {
        const newMsg = new Message({
            username,
            message
        });
        await newMsg.save();
        console.log('Message saved', newMsg);
        res.status(201).json({
            message: 'Message sent successfully',
            data: newMsg
        });
    } catch (err) {
        console.error('Error sending msg:', err);
        res.status(500).json({ error: 'failed to send message' });
    }
};
export default sendMessage;
