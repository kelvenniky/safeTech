import {io, userSocketMap} from '../index.js'
import Message from '../models/messageModel.js';


export const sendMessage = async (req, res) => {
    try {

        
      const { senderId, receiverId, message } = req.body; // Ensure this is destructured correctly


        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        res.json({
            success: true,
            newMessage
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


