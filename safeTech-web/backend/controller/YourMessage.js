import Message from "../models/messageModel.js"

async function YourMessages (req, res) {

    try {
        
        const { senderId, receiverId } = req.query;
  
              const messages = await Message.find({
                $or: [
                  { senderId: senderId, receiverId: receiverId },
                  { senderId: receiverId, receiverId: senderId },
                ],
              }).populate("senderId", "_id name");
          
              res.status(200).json(messages);


    } catch (error) {
        console.log("Error", error);
    }


}

export default YourMessages

