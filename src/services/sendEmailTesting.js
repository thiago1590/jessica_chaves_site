const nodemailer = require("nodemailer");
require('dotenv').config()

async function main() {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { 
      user: process.env.SENDER_EMAIL, // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from: `"Jéssica Chaves 👻" <${process.env.SENDER_EMAIL}>`, // sender address
    to: "thiagoandre2121@gmail.com, noemie.watsica50@ethereal.email", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main