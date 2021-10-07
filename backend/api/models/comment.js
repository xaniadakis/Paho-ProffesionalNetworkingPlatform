const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    text: {type: String , default: "Default comment"} ,
    commentator_name: {type: String , default: "Default commentator name"} ,
    _owner_comm: {type: mongoose.Schema.ObjectId , default: "611502d708f1d826be050e19"} ,
    postId: {type: mongoose.Schema.ObjectId , default: "6151ffc6c5fdb6b73a88f4c7"},
    date_comm: {type: Date , default: Date.now()} 
})

module.exports = mongoose.model('Comment', commentSchema);
