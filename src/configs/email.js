const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure : false,
    auth: {
      user: "4d573f92422d1f",
      pass: "4a51777fb84213"
    }
  });

module.exports = transporter  


// this file is basically the confugration part of nodemailer for email sending