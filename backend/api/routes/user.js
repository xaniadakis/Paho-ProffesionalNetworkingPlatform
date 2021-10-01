const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
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

// ---------------- signup ----------------------- // 

router.post("/signup",upload.single('user_Image') ,(req, res, next) => {
  console.log(req.body.email)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        if (req.body.password1 != req.body.password2){
          return res.status(500).json({
            error: "Given password don't match"
          });
        }
        bcrypt.hash(req.body.password1, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } 
          else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              surname: req.body.surname,
              age: req.body.age,
              education: req.body.education,
              job_description: req.body.job_description,
              is_active: true
        
            });
            const token = jwt.sign({
              name: user.name,
              email: user.email,
              userID: user._id
            } , 
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h"
            });
            if(req.file !== undefined){
              console.log(req.file.path)
              user.user_Image = req.file.path
            }
            user
              .save()
              .then(result => {
                console.log(result);
                return res.status(201).json({
                  message: 'SignUp Succesful',
                  token: token,
                  admin: "false"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

// ---------------- login ----------------------- // 

router.post("/login" , (req, res, next ) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if(user.length < 1 ){
        return res.status(401).json({
          message: 'Authentication Failure1'
        });
      }
      bcrypt.compare(req.body.password , user.password , (err ,result) => {
        if (err){
          return res.status(401).json({
            message: 'Authentication Failure2'
          });
        }
        if (result){
          const token = jwt.sign({
              name: user.name,
              email: user.email,
              userID: user._id
            } , 
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h"
            }
          );

          // save user token
          user.token = token;
          user.is_active = true;
          user.save((err) => {
            if (err) return res.status(500).json({message: err.message});
          });
          if ( user.email == "admin@di.uoa.gr")
          {
            return res.status(200).json({
                message: 'Authentication Succesful',
                token: token,
                admin: "true"
            });
          }else{
            return res.status(200).json({
              message: 'Authentication Succesful',
              token: token,
              admin: "false"
            });
          }
        }
        return res.status(401).json({
          message: 'Authentication Failure'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
});

// ---------------- logout ----------------------- // 

router.patch("/logout/:UserId" , async (req, res) => {
  User.findOne({_id: req.params.UserId})
      .then((user) => {
          // check if user exists
          if(!user) return res.status(401).json({message: 'User not found'});
          //update data
          user.is_active = false 
          // save changes
          user.save((err) => {
              if (err) return res.status(500).json({message: err.message});

              res.status(200).json({message: 'Succesfully logged out'});
          });
      });
});

// ---------------- delete ----------------------- // 

router.delete("/:userId" , (req, res, next) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "User deleted"
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
              message: "UserID doesnt exist"
            });
        }
    });
});

module.exports = router;