const express = require("express");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");

 const router = express.Router();

 router.post("/" , async (req,res)=>{
    try{
      const user = await User.create(req.body);
        //const user = new User(req.body);
        user.otp = "6245"
        await user.save();
        var message = {
            // here we create the massage for sending
            from: "shekhar.shashi735@gmail.com",
            to: [user.email], 
            subject: `${user.otp} Please verify`,
            text: `Hi your producted is created please verify the otp`,
            html: "<p>producted is created Please verify</p>",
            attachments: null,
          };  
          sendEmail(message);
      return res.status(200).send(user);
    }catch(err){
    return res.status(500).send(err.message);
    }
 })

 router.get("/" , async(req,res)=>{
    try{
    const user = await User.find().lean().exec();
    return res.status(200).send(user);
    }catch(err){
     return res.status(500).send(err.message);
    }
 })


 module.exports = router ; 