const express = require('express');
const router = express.Router();

router.get('/' , (req,res,next) =>{
    res.status(200).json({
        message: 'Welcome page handling GET requests'
    });
});

router.post('/' , (req,res,next) =>{
    const user = {
        name2: req.body.name1,
        pass2: req.body.pass1
    };
    res.status(200).json({
        message: 'Welcome page handling POST requests',
        message2: user
    });
});

router.get('/:welcomeID' , (req,res,next) =>{
    const id = req.params.welcomeID;
    if ( id == 123){
        res.status(200).json({
            message: 'WOW you found the secret ID'
        });
    }else{
        res.status(200).json({
            message: 'Welcome page with ID'
        });
    }
});

module.exports = router;