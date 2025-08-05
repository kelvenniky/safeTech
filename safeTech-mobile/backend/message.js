const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"people",
        
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"people",
        
    },
    message:String,
    timeStamp:{
        type:Date,
        default:Date.now
    },
   
},
{
    collection: "messages",
})



const Message = mongoose.model('messages', messageSchema);

module.exports = Message