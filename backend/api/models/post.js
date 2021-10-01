const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true  , default: "Default post title"},
    text: { type: String, required: true , default: "Default post text"},
    post_Image: {type: String, required: false},
    _owner: { type: mongoose.Schema.ObjectId , required: true, default: "6115093c33d5632980878ed1"},
    date: { type: Date, required: true , default: Date.now()},
    likes: { type: Number, required: true , default: 0},
    comments: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('Post', postSchema);