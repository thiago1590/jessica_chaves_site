const MercadoPago = require('mercadopago');
const knex = require('../database')
const fetch = require('node-fetch');
const sendEmail = require('../services/sendEmail')
require('dotenv').config()

const getFullUrl = (req) =>{
    const url = req.protocol + '://' + req.get('host');
    console.log(url)
    return url;
}

module.exports = {
    async checkout(req, res){

        MercadoPago.configure({
            sandbox: false,
            access_token: 'APP_USR-6245134050800709-052902-27d21be63f5445672496842bd0eba048-156098999'
        });

        const { id, email, description, amount } = req.params;

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
            auto_return : "all",
            external_reference : id,
            back_urls : {
              success : getFullUrl(req) + "/payments/success",
              pending : getFullUrl(req) + "/payments/pending",
              failure : getFullUrl(req) + "/payments/success",
            }
          }

          try {
            const preference = await MercadoPago.preferences.create(purchaseOrder);
            return res.redirect(`${preference.body.init_point}`);
          }catch(err){
            return res.send(err.message);
          }
    },

    async listenPurchase(req,res){
      let {data:{id}} = req.body

      fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {'Authorization': 'Bearer APP_USR-6245134050800709-052902-27d21be63f5445672496842bd0eba048-156098999'}
      }).then(res => res.json())
        .then(async json => {
        let {payer:{email},status} = json
        if(status == 'approved') {
          try {
            await knex('buyers').insert({
              idPayment: id,
              email: email
          })
          sendEmail()
          }  catch(err) {
            return res.send(err.message)
          }
        }
      })
      .catch(err => console.log(err.message))

      return res.status(301).send('ok')
  },

    async listBuyers(req,res) {
      const buyers = await knex('buyers')
      return res.status(200).json(buyers)
    },
}