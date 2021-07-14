nodemailer = require('nodemailer')


    async function sendEmail() {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'thiagojetix11@gmail.com',
            pass: 'thiago2121'
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    
    try{
        let info = await transporter.sendMail({
            from: '"Jéssica Chaves" thiagojetix11@gmail.com', // sender address
            to: "thiagoandre2121@gmail.com, thiagojetix11@gmail.com", // list of receivers
            subject: "Ebook Jéssica Chaves", // Subject line
            text: "Muito obrigada pela compra! Aqui está seu ebook", // plain text body
            html: "Muito obrigada pela compra! Aqui está seu ebook", // html body
            });

            console.log("Message sent: %s", info.messageId);
            return info.messageId
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = sendEmail

