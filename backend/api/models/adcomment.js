const mongoose = require('mongoose');

const adcommentSchema = mongoose.Schema({ 
    _id: mongoose.Schema.Types.ObjectId,
    text: {type: String , default: "Default adcomment"} ,
    commentator_name: {type: String , default: "Default adcommentator name"} ,
    _owner_comm: {type: mongoose.Schema.ObjectId , default: "611502d708f1d826be050e19"} ,
    postingId: {type: mongoose.Schema.ObjectId , default: "6151ffc6c5fdb6b73a88f4c7"},
    date_comm: {type: Date , default: Date.now()} 
})

module.exports = mongoose.model('ad_Comment', adcommentSchema);