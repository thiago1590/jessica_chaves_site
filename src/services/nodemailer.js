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

        const email1TemplatePath = resolve(__dirname, "..", "..", "public", "templateEmail", "first_email.hbs") 
        const template1FileContent = fs.readFileSync(email1TemplatePath).toString("utf8")
        const mail1TemplateParse =  handlebars.compile(template1FileContent)
        const html1 = mail1TemplateParse()

        const email2TemplatePath = resolve(__dirname, "..", "..", "public", "templateEmail", "second_email.hbs") 
        const template2FileContent = fs.readFileSync(email2TemplatePath).toString("utf8")
        const mail2TemplateParse =  handlebars.compile(template2FileContent)
        const html2 = mail2TemplateParse({link:process.env.EBOOK_LINK})

        if (whichEmail == "first") {
            let info = await transporter.sendMail({
                from: `"Jéssica Chaves" <${process.env.SENDER_EMAIL}>`, 
                to: `${receiverEmail}`, 
                subject: "Pedido recebido - Ebook", 
                text: "Acabei de receber o seu pedido, obrigada! Assim que seu pagamento for confirmado você receberá um e-mail com o ebook em anexo. Qualquer problema é só me contatar pelo whatsapp: 21 965412338 ou responder esse email.", 
                html: html1, 
            });
            console.log("Message sent: %s", info.messageId);
        }

        if (whichEmail == "second") {
            let info = await transporter.sendMail({
                from: `"Jéssica Chaves" <${process.env.SENDER_EMAIL}>`,
                to: `${receiverEmail}`, 
                subject: "Pagamento Confirmado - Ebook de Receitas", 
                text: "Seu pagamento foi confirmado, obrigada! Abaixo está o link para o seu Ebook de Receitas.", 
                html: html2 
            });
            console.log("Message sent: %s", info.messageId);
        }

    } catch (err) {
        console.log(err.message)
    }
}

module.exports = main