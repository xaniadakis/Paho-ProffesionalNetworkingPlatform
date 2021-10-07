const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    country: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    number: { type: Number, required: false },
    postcode: { type: String, required: false },
    mobile: { type: Number, required: false },
    skills: { type: String, required: false },
    github: { type: String, required: false },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    instagram: { type: String, required: false},
    youtube: { type: String, required: false },
    age: { type: Number , required: true},
    friends: [ mongoose.Schema.Types.ObjectId ],
    cv: { type: String, required: false },
    education: { type: String , required: false},
    job_description: { type: String , required: false},
    user_Image: {type: String ,default: "uploads/Solid_black.png" ,required: false},
    token:{ type: String, required: false },
    liked_posts: {type: [mongoose.Schema.ObjectId] , required: false , default: []},
    is_active: {type: Boolean , default:false}
});

module.exports = mongoose.model('User', userSchema);