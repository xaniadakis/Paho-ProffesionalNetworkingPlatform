const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.get("/:UserId" , async (req, res) => {
    try{
        const filter = { _id: req.params.UserId};
        const user = await User.find(filter)
        console.log(user)
        res.status(200)
        res.send(user)
    }catch{
        res.status(500)
        res.send({ error: "error /personalInfo/ ---"})
    }
});

router.patch("/:UserId" , async (req, res) => {
    User.findOne({_id: req.params.UserId})
        .then((user) => {
            // check if user exists
            if(!user) return res.status(401).json({message: 'User not found'});
            //update data
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.country = req.body.country;
            user.city = req.body.city;
            user.address = req.body.address;
            user.number = req.body.number;
            user.postcode = req.body.postcode;
            user.job_description = req.body.job_description;
            user.education = req.body.education;
            user.skills = req.body.skills;
            user.age = req.body.age;
            user.mobile = req.body.mobile;
            user.email = req.body.email;
            user.github = req.body.github;
            user.facebook = req.body.facebook;
            user.twitter = req.body.twitter;
            user.instagram = req.body.instagram;
            user.youtube = req.body.youtube;
            // save changes
            user.save((err) => {
                if (err) return res.status(500).json({message: err.message});

                res.status(200).json({message: 'Your info has been updated'});
            });
        });
});

module.exports = router;