const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config({path: __dirname + '/.env',})
// const env = require('dotenv').config({path: __dirname + '/../../.env'})
const auth = require("./middleware/auth");
const fs = require('fs')
const cors = require('cors')
const multer = require('multer')


const welocomeRoute = require('./api/routes/welcome');
const userRoute = require('./api/routes/user');
const startpageRoute = require('./api/routes/startpage');
const postingsRoute = require('./api/routes/postings.js');
const networkRoute = require('./api/routes/network.js');
const settingsRoute = require('./api/routes/settings.js');
const chatRoute = require('./api/routes/chat.js');
const requestsRoute = require('./api/routes/requests.js');
const personalInfoRoute = require('./api/routes/personalInfo.js');


mongoose.connect(
    process.env.DATABASE,
    { useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true})

app.use(cors({
    origin: "*"
}))

app.use(morgan('dev'));
app.use('/uploads' , express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO : put auth middleware

app.use('/requests' , requestsRoute);
app.use('/welcome' , welocomeRoute);
app.use('/user' , userRoute );
// app.use('/startpage', startpageRoute);
app.use('/network', networkRoute);
app.use('/startpage', auth , startpageRoute);
app.use('/postings', postingsRoute);
app.use('/settings', settingsRoute);
app.use('/chat', chatRoute);
app.use('/personalInfo', personalInfoRoute);

// const sendMail = (user, callback) => {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "evangelos.chaniadakis@twi.gr",
//         pass: "koimkoim99"
//       }
//     });
//   }

// const mailOptions = {
// from: `"<Sender’s name>", "<Sender’s email>"`,
// to: `<${user.email}>`,
// subject: "<Message subject>",
// html: "<h1>And here is the place for HTML</h1>"
// };
  
// transporter.sendMail(mailOptions, callback);
  
// app.post("/sendmail", (req, res) => {
//     console.log("request came");
//     let user = req.body;
//     sendMail(user, (err, info) => {
//       if (err) {
//         console.log(err);
//         res.status(400);
//         res.send({ error: "Failed to send email" });
//       } else {
//         console.log("Email has been sent");
//         res.send(info);
//       }
//     });
//   });

app.use((req,res,next) =>{
    const error = new Error('Not found <3');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next ) => {
    res.status(error.status || 502);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;