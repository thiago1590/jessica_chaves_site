const MercadoPago = require('mercadopago');
const knex = require('../')
const fetch = require('node-fetch');
const sendEmailRules = require('../services/sendEmailRules')
const { v4 } = require('uuid')
require('dotenv').config()

const getFullUrl = (req) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(url)
  return url
}

module.exports = {
  async checkout(req, res) {

    MercadoPago.configure({
      sandbox: false,
      access_token: process.env.MP_ACCESS_TOKEN
    })

    const { name, email, phone, amount} = req.params
    const id = v4()

    const purchaseOrder = {
      items: [
        item = {
          id,
          title: 'Ebook de receitas',
          description: 'É um ebook de receitas criado com muito carinho para te auxiliar a ter uma vida saudável, obtendo os resultados desejados, com mais flexibilidade e variação no seu plano alimentar',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }
      ],
      payer: {
        name,
        email,
        phone: {
          number: parseFloat(phone)
        }

      },
      auto_return: 'all',
      external_reference: id,
      back_urls: {
        success: getFullUrl(req) + '/payments/success',
        pending: getFullUrl(req) + '/payments/pending',
        failure: getFullUrl(req) + '/payments/success',
      }
    }

    try {
      const preference = await MercadoPago.preferences.create(purchaseOrder)
      return res.redirect(`${preference.body.init_point}`)
    } catch (err) {
      return res.send(err.message)
    }
  },

  async listenPurchase(req, res) {
    let {data:{id}} = req.body

    fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    }).then(res => res.json())
      .then(
        async paymentInfo => {
          let { payer: { name, email, phone:{number} }, status } = paymentInfo
          let response = await sendEmailRules(id,name,email,number,status)
          console.log(response)
        }
      )
      .catch(err => console.log(err.message))
      return res.status(200).send('processo finalizado')
  },

  async listPurchases(req, res) {
    const buyers = await knex('buyers')
    return res.status(200).json(buyers)
  },
}