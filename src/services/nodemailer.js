const nodemailer = require("nodemailer");
const { google } = require('googleapis')
require('dotenv').config()
const {resolve} = require('path')
const handlebars = require('handlebars')
const fs = require('fs')

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function main(receiverEmail, whichEmail) {
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

        const emailTemplatePath = resolve(__dirname, "..", "..", "public", "templateEmail", "email.hbs" ) 
        const templateFileContent = fs.readFileSync(emailTemplatePath).toString("utf8")

        const mailTemplateParse =  handlebars.compile(templateFileContent)

        const html = mailTemplateParse()

        if (whichEmail == "first") {
            let info = await transporter.sendMail({
                from: `"Jéssica Chaves" <${process.env.SENDER_EMAIL}>`, 
                to: `${receiverEmail}`, 
                subject: "Pedido recebido - Ebook", 
                text: "Acabei de receber o seu pedido, obrigada! Assim que seu pagamento for confirmado você receberá um e-mail com o ebook em anexo. Qualquer problema é só me contatar pelo whatsapp: 21 965412338 ou responder esse email.", 
                html: html, 
            });
            console.log("Message sent: %s", info.messageId);
        }

        if (whichEmail == "second") {
            let info = await transporter.sendMail({
                from: `"Jéssica Chaves" <${process.env.SENDER_EMAIL}>`,
                to: `${receiverEmail}`, 
                subject: "Ebook de Receitas", 
                text: "Seu pagamento foi confirmado, obrigada! Abaixo está o link para o seu Ebook de Receitas.", 
                html: `<b>Seu pagamento foi confirmado, obrigada! Abaixo está o link para o seu Ebook de Receitas. <br/> ${process.env.EBOOK_LINK} </b>`, 
            });
            console.log("Message sent: %s", info.messageId);
        }

    } catch (err) {
        console.log(err.message)
    }
}

module.exports = main