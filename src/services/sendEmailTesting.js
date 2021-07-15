const nodemailer = require("nodemailer");
const {google} = require('googleapis')
require('dotenv').config()

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})

async function main() {
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

    let info = await transporter.sendMail({
      from: `"Jéssica Chaves 👻" <${process.env.SENDER_EMAIL}>`, // sender address
      to: "thiagoandre2121@gmail.com, thiagoandre1590@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

  } catch(err) {
    console.log(err.message)
  }

  
}

module.exports = main