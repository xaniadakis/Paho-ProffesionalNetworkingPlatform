const mongoose = require('mongoose');
// const userSchema = require("../models/user");

const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true  , default: "Default posting title"},
    text: { type: String, required: true , default: "Default posting text"},
    _owner: { type: mongoose.Schema.ObjectId , required: true, default: "6115093c33d5632980878ed1"},
    _to_friend: {type: mongoose.Schema.ObjectId , required: false},
    _owner_name: {type: mongoose.Schema.ObjectId , required: false}
});

module.exports = mongoose.model('Request', requestSchema);