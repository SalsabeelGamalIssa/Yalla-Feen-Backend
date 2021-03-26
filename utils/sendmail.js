const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  service:'gmail',
  auth:{
    user:'mustafa.ryad12@gmail.com',
    pass:'yallafeen'
  }
})


// const mailOptions = {
//   from:"mustafa.ryad12@gmail.com",
//   to:"mustafaryad1@gmail.com",
//   subject:"Hello M",
//   text:"welcome to mail sender"
// }


// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

module.exports = {transporter}