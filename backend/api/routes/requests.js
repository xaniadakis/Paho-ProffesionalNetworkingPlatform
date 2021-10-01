const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Request = require("../models/requests");
const { findById } = require("../models/post");
const user = require("../models/user");

//----------------- create_request ------------------------// 

router.post("/create" , async (req, res) => {

    try{
        const user1 = await User.findOne({ _id: req.body._owner})
        const user2 = await User.findOne({ _id: req.body._to_friend})
        const request = new Request({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            text: req.body.text,
            _owner: req.body._owner,
            _to_friend: req.body._to_friend,
        });
        await request.save()
        res.status(200).send({message: "all good"})
    }catch (error) {
        res.status(404)
		res.send({ error: "User1 or USER2 doesn't exist!" })
    }

});


// -----------------get-users-requests-------------------------//

router.get("/getreqs/:userId" , async (req, res) => {
  try{
    const all = await Request.find({ _to_friend: req.params.userId}).lean()
    let user_array = []
    var user_Var;
    for (var i = 0; i < all.length; i++) 
    {
      user_Var = await User.findOne({ _id: all[i]._owner })
    //   console.log(user_Var[0])
      all[i]._owner_name = user_Var
    //   await all[i].save()
      user_array.push(user_Var)
    }
    res.send(JSON.stringify(all.reverse()))
  }catch{
    res.status(500)
    res.send({ error: "error getall requests"})
  }
});


// ---------------- pressing_accept ----------------------- // 

router.put("/accept/:requestId" , async (req, res) => {

    try {
        const request = await Request.findOne({ _id: req.params.requestId })
        const user1 = await User.findOne({_id: request._owner})
        const user2 = await User.findOne({_id: request._to_friend})
        // console.log(request , user1 , user2)
        user1.friends.push(user2._id)
        user2.friends.push(user1._id)
        await user1.save()
        await user2.save()
        await Request.remove({ _id: req.params.requestId })
        res.status(200).send({message: user1.name +  " and " + user2.name + " became friends"})
    } catch (error) {
        res.status(404)
		res.send({ error: "Something brong at request accept" })
    }
});

// ---------------- pressing_decline ----------------------- // 

router.delete("/decline/:requestId" , async (req, res) => {
    try {
        const request = await Request.findOne({ _id: req.params.requestId })
        await Request.remove({ _id: req.params.requestId })
        res.status(200).send({message: "Request kindly declinded "})
    } catch (error) {
        res.status(404)
		res.send({ error: error })
    }
});


module.exports = router;