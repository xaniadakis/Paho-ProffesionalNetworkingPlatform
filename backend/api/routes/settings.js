const express = require("express");
const router = express.Router();
// const router = require('express-promise-router')();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");

router.patch("/password" , async (req, res) => {
    User.findOne({_id: req.body.UserId})
        .then((user) => {
            // check if user exists
            if(!user) return res.status(401).json({message: 'User not found'});
            // set new password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err){
                    return res.status(500).json({error: err});
                }else{
                    user.password = hash;
                    // save changes
                    user.save((err) => {
                        if (err) return res.status(500).json({message: err.message});
                        res.status(200).json({message: 'Your password has been updated'});
                    });
                }
            })
        });
});

// try{
//     const filter = { _id: req.body.UserId};
//     const user = await User.find(filter)
//     console.log(user[0].email)
//     user[0].email = req.body.email
//     await user.save()
//     console.log(user[0].email)
//     res.status(200)
//     res.send("Mail changed succesfully")
// }catch{
//     res.status(500)
//     res.send({ error: "error settings mail"})
// }   

router.patch("/mail" , async (req, res) => {
    User.findOne({_id: req.body.UserId})
        .then((user) => {
            // check if user exists
            if(!user) return res.status(401).json({message: 'User not found'});
            // set new mail
            user.email = req.body.email;
            // save changes
            user.save((err) => {
                if (err) return res.status(500).json({message: err.message});

                res.status(200).json({message: 'Your email has been updated'});
            });
        });
});



module.exports = router;