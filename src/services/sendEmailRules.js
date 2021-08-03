const knex = require('../database')
const mailer = require('./nodemailer')
const { v4 } = require('uuid')

async function createPurchase(id, buyer_email, status) {
  try{
    let retorno = await knex('purchase').insert({
      id: v4(),
      id_payment: id,
      buyer_email,
      first_email_sent: 0,
      second_email_sent: 0,
      status
    })
    return retorno
  } catch(err) {
    console.log(err.message)
  }
}

async function findPurchase(id) {
  let purchase = await knex('purchase').where({ id_payment: id })
  return purchase
}

async function sendEmail(id, buyer_email, status) {
  let purchase = await findPurchase(id)
  if (!purchase.id) {
    await createPurchase(id, buyer_email, status)
    console.log('compra criada no DB')
  }
  
  var [{ first_email_sent, second_email_sent }] = await findPurchase(id)
  
    
  if (status == 'pending') {
    if (first_email_sent == 0) {
      mailer(buyer_email, "first")

      try {
        await knex('purchase').update({ first_email_sent: 1 }).where({ id_payment: id })
        return 'sent first email'
      } catch (err) {
        return err.message
      }
    }
    return 'first email already sent'
  }

  if (status == 'approved') {
    if (second_email_sent == 0) {
      mailer(buyer_email, "second")

      try {
        await knex('purchase').update({ second_email_sent: 1 }).where({ id_payment: id })
        return 'sent second email'
      } catch (err) {
        return err.message
      }
    }
    return 'second email already sent'
  }

  return 'payment is not pending or approved'
}

module.exports = sendEmail