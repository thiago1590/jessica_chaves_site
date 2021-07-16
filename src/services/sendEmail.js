const nodemailer = require("nodemailer");
const {google} = require('googleapis')
require('dotenv').config()

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})

async function main(senderEmail,whichEmail) {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { 
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID, 
        clientSecret: process.env.CLIENT_SECRET, 
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    if(whichEmail == "first") {
        let info = await transporter.sendMail({
            from: `"Jéssica Chaves" <${process.env.SENDER_EMAIL}>`, // sender address
            to: `thiagoandre2121@gmail.com, ${senderEmail}`, // list of receivers
            subject: "First Email ✔", // Subject line
            text: "First Email", // plain text body
            html: "<b>First Email</b>", // html body
          });
          console.log("Message sent: %s", info.messageId);
    }

    if(whichEmail == "second") {
        let info = await transporter.sendMail({
            from: `"Jéssica Chaves 👻" <${process.env.SENDER_EMAIL}>`, // sender address
            to: `thiagoandre2121@gmail.com, ${senderEmail}`, // list of receivers
            subject: "Second Email ✔", // Subject line
            text: "Second Email", // plain text body
            html: "<b>Second Email?</b>", // html body
          });
          console.log("Message sent: %s", info.messageId);
    }
    
  } catch(err) {
    console.log(err.message)
  }

  
}

module.exports = main