const transporter = require("../configs/email");

function sendEmail(data){
    transporter.sendMail(data)  //  here we use transporter to send message
}

module.exports = sendEmail