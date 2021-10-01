const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const ad_Comment = require("../models/adcomment");
const Posting =  require("../models/postings");
const { findById } = require("../models/post");

//----------------- create_posting ------------------------// 

router.post("/" , (req, res, next) => {
  const posting = new Posting({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    text: req.body.text,
    _owner: req.body._owner,
    date: Date.now(),
    likes: '0',
    comments: []
  });
  posting
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Posting created"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// --------------- like_post ------------------------ //

router.post("/like" , async (req, res) => {
  try {
		const posting = await Posting.findOne({ _id: req.body.postId })
		const user = await User.findOne({ _id: req.body.userID })
    // console.log(user.liked_posts.includes(post._id))
    // if post not alread like be "me"
    if(!user.liked_posts.includes(posting._id)){
      posting.likes = posting.likes + 1
      // console.log(post._id)
      if(posting._id !== undefined )
        user.liked_postings.push(posting._id)
      await user.save()
      await posting.save()
		  res.send(posting)
    }else{
      res.status(501)
      res.send({ error: "Already liked the posting"})
    }
	} catch {
		res.status(404)
		res.send({ error: "posting doesn't exist!" })
	}
});

// -----------------get-all-------------------------//

router.get("/getallpostings" , async (req, res) => {
  try{
    const filter = {};
    const all = await Posting.find(filter).lean()
    const postings = await Posting.find(filter)
    console.log(postings)

    var user_Var;
    for (var i = 0; i < postings.length; i++) 
    {
      user_Var = await User.find({ _id: postings[i]._owner })  
      console.log(user_Var)

      all[i]._owner_name = user_Var[0]
      comments = await ad_Comment.find({postingId: postings[i]._id})
      all[i].ncomments = comments
    }
    const all_reversed = all.reverse()
    console.log(JSON.stringify(all))
    res.send(JSON.stringify(all_reversed))
  }catch{
    res.status(500)
    res.send({ error: "error getall posting"})
  }
});

// ---------------- comment_posting ----------------------- // 

router.post("/comment/:postingId" , async (req, res) => {
  try {
		const posting = await Posting.findOne({ _id: req.params.postingId })
    const user_Var = await User.findOne({ _id: req.body._owner })
		const adcomment = new ad_Comment({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      commentator_name: user_Var.name + ' ' + user_Var.surname,
      _owner_comm: req.body._owner,
      postingId: req.params.postingId,
      date_comm: Date.now()
    });
    await adcomment.save()
    console.log(adcomment)

    posting.comments.push(adcomment._id);

		await posting.save()
    console.log(adcomment)
		res.status(201).json({
      message: "comment created"
    });
	} catch {
		res.status(404)
		res.send({ error: "posting doesn't exist!" })
	}
});

// ---------------- delete_posting ----------------------- // 

router.delete("/:postingId" , (req, res, next) => {
  Posting.find({ _id: req.params.postingId })
    .exec()
    .then(posting => {
      if (posting.length >= 1) {
        Posting.remove({ _id: req.params.postingId })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "posting deleted"
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      } else {
            return res.status(409).json({
              message: "postingID doesnt exist"
            });
        }
    });
});

module.exports = router;