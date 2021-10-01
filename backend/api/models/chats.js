const mongoose = require('mongoose');


const chatSchema = mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    user1: mongoose.Schema.Types.ObjectId,
    user2: mongoose.Schema.Types.ObjectId,
    sender: mongoose.Schema.Types.ObjectId,
    message: [{}],
    timestamp: {type: Date , default: Date.now() }
})

const messageSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    room_id: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    message_body: String,
    message_status:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chats', chatSchema);
module.exports = mongoose.model('Messages', messageSchema);