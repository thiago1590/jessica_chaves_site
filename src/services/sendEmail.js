nodemailer = require('nodemailer')
require('dotenv').config()
let aws = require('@aws-sdk/client-ses');

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'sa-east-1',
});

async function sendEmail() {

    let transporter = nodemailer.createTransport({
        SES: { ses, aws },
        });
    
    try{
        let info = await transporter.sendMail({
            from: `"Jéssica Chaves" ${process.env.SENDER_EMAIL}`,
            to: 'thiagoandre2121@gmail.com, thiagojetix11@gmail.com', 
            subject: 'Ebook Jéssica Chaves', 
            text: 'Muito obrigada pela compra! Aqui está seu ebook', 
            html: 'Muito obrigada pela compra! Aqui está seu ebook',
            });

            console.log("Message sent: %s", info.messageId);
            return info.messageId
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = sendEmail

