const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Chat = require("../models/chats");


router.get("/", async (req, res) => {
    try {
        let result = await collection.findOne({ "user1": req.body.user1 , "user2": req.body.user2});
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

router.get("/names" , async (req, res) => {
    try{
        const filter = { _id: req.body.UserId};
        const user = await User.find(filter)
        const friends = user[0].friends;
        console.log(friends)
        let array_friends = []
        var tmp_usr;
        for (var i = 0; i < friends.length; i++) 
        {
            tmp_usr = await User.find({ _id: friends[i]._id })
            array_friends.push(tmp_usr[0].name)
        }
        console.log(array_friends)
        res.status(200)
        res.send(array_friends)
    }catch{
        res.status(500)
        res.send({ error: "error /chat/names"})
    }
});

module.exports = router;