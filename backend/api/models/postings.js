const mongoose = require('mongoose');

const postingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true  , default: "Default posting title"},
    text: { type: String, required: true , default: "Default posting text"},
    _owner: { type: mongoose.Schema.ObjectId , required: true, default: "6115093c33d5632980878ed1"},
    date: { type: Date, required: true , default: Date.now()},
    likes: { type: Number, required: true , default: 0},
    comments: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('Posting', postingSchema);