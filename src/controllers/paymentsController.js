const MercadoPago = require('mercadopago');
const knex = require('../database')
const fetch = require('node-fetch');
const sendEmail = require('../services/sendEmail')
const {v4} = require('uuid')
require('dotenv').config()

const getFullUrl = (req) =>{
    const url = req.protocol + '://' + req.get('host')
    console.log(url)
    return url
}

module.exports = {
    async checkout(req, res){

        MercadoPago.configure({
            sandbox: false,
            access_token: process.env.MP_ACCESS_TOKEN
        })

        const { id, email, description, amount } = req.params

        const purchaseOrder = {
            items: [
              item = {
                id: id,
                title: description,
                description : description,
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(amount)
              }
            ],
            payer : {
              email: email
            },
            auto_return : 'all',
            external_reference : id,
            back_urls : {
              success : getFullUrl(req) + '/payments/success',
              pending : getFullUrl(req) + '/payments/pending',
              failure : getFullUrl(req) + '/payments/success',
            }
          }

          try {
            const preference = await MercadoPago.preferences.create(purchaseOrder)
            return res.redirect(`${preference.body.init_point}`)
          }catch(err){
            return res.send(err.message)
          }
    },

    async listenPurchase(req,res){
      let {data:{id}} = req.body

      fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`}
      }).then(res => res.json())
        .then(
          async json => {
            let {payer:{email},status} = json
            console.log(json)
            //let email_sent = await knex('purchase').select('email_sent').where({idPayment:id})
            if(status == 'approved') {
              try {
                sendEmail('thiagoandre2121@gmail.com', 'first')
                await knex('purchase').insert({
                  id: v4(),
                  id_payment: id,
                  buyer_email:email,
                  first_email_sent: 1,
                  second_email_sent:1,
                  status: status
              })
                }  catch(err) {
                return res.send(err.message)
              }
            }
          }
        )
      .catch(err => console.log(err.message))
      console.log('-------------------------------------------')
      return res.status(200).send('ok')
  },

    async listPurchases(req,res) {
      const buyers = await knex('buyers')
      return res.status(200).json(buyers)
    },
}