const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './uploads/');
  },
  filename: function(req , file, cb){
    cb(null , new Date().toISOString() + file.originalname);
  }
})
const fileFilter = (req , file , cb ) => {
  //rejection
  
  if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png' )
  {
    cb(null , true);
  }else{
    cb(new Error('Error filetype') , false);
  }
}
const upload = multer({storage: storage , limits:{
  fileSize: 1024 * 1024 * 5 
  },
  fileFilter: fileFilter
});

const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const { findById } = require("../models/post");

//----------------- create_post ------------------------// 

//  upload.single('post_Image')
router.post("/post" , upload.single('post_Image'), (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    text: req.body.text,
    _owner: req.body._owner,
    date: Date.now(),
    likes: '0',
    comments: []
  });
  if(req.file !== undefined){
    post.post_Image = req.file.path
  }
  post
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post created"
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

router.post("/post/like" , async (req, res) => {
  try {
		const post = await Post.findOne({ _id: req.body.postId })
		const user = await User.findOne({ _id: req.body.userID })
    // console.log(user.liked_posts.includes(post._id))
    // if post not alread like be "me"
    if(!user.liked_posts.includes(post._id)){
      post.likes = post.likes + 1
      // console.log(post._id)
      if(post._id !== undefined )
        user.liked_posts.push(post._id)
      await user.save()
      await post.save()
		  res.send(post)
    }else{
      res.status(501)
      res.send({ error: "Already liked the post"})
    }
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
});

// -----------------get-all-------------------------//

router.get("/post/getallposts" , async (req, res) => {
  try{
    const filter = {};
    const all = await Post.find(filter).lean()
    const posts = await Post.find(filter)
    var user_Var;
    for (var i = 0; i < posts.length; i++) 
    {
      user_Var = await User.find({ _id: posts[i]._owner })  
      all[i]._owner_name = user_Var[0]
      comments = await Comment.find({postId: posts[i]._id})
      all[i].ncomments = comments
    }
    const all_reversed = all.reverse()
    // console.log(JSON.stringify(all))
    res.send(JSON.stringify(all_reversed))
  }catch{
    res.status(500)
    res.send({ error: "error getall post"})
  }
});

// ---------------- comment_post ----------------------- // 

router.post("/post/comment/:postId" , async (req, res) => {
  try {
		const post = await Post.findOne({ _id: req.params.postId })
    const user_Var = await User.findOne({ _id: req.body._owner })
		const comment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      commentator_name: user_Var.name + ' ' + user_Var.surname,
      _owner_comm: req.body._owner,
      postId: req.params.postId,
      date_comm: Date.now()
    });
    await comment.save()

    post.comments.push(comment._id);

		await post.save()
    console.log(comment)
		res.status(201).json({
      message: "comment created"
    });
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
});

// ---------------- delete_post ----------------------- // 

router.delete("/post/:postId" , (req, res, next) => {
  Post.find({ _id: req.params.postId })
    .exec()
    .then(post => {
      if (post.length >= 1) {
        Post.remove({ _id: req.params.postId })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "Post deleted"
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
              message: "PostID doesnt exist"
            });
        }
    });
});

module.exports = router;