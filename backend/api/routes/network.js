const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.get("/" , async (req , res) => {
    try{
        const filter = {};
        let users = await User.find(filter);
        res.status(200)
        res.send(users)
    }catch{
        res.status(500)
        res.send({ error: "error hahahh "})
    }
});

router.get("/:UserId" , async (req, res) => {
    try{
        const filter = { _id: req.params.UserId};
        const user = await User.find(filter)
        const friends = user[0].friends;
        console.log(friends)
        let array_friends = []
        var tmp_usr;
        for (var i = 0; i < friends.length; i++) 
        {
            tmp_usr = await User.find({ _id: friends[i]._id })
            array_friends.push(tmp_usr[0])
        }
        console.log(array_friends)
        res.status(200)
        res.send(array_friends)
    }catch{
        res.status(500)
        res.send({ error: "error /network/ ---"})
    }
});

router.get("/all" , async (req , res) => {
    try{
        console.log("check")
        const filter = {};
        let users = await User.find(filter);
        res.status(200)
        res.send(JSON.stringify(users))
    }catch{
        res.status(500)
        res.send({ error: "error /network/all"})
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
            array_friends.push(tmp_usr[0])
        }
        console.log(array_friends)
        res.status(200)
        res.send(array_friends)
    }catch{
        res.status(501)
        res.send({ error: "error /network/names"})
    }
});

module.exports = router;