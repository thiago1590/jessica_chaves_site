const knex = require('../database')
const mailer = require('./nodemailer')
const { v4 } = require('uuid')

async function sendEmail(id, buyer_name, buyer_email, buyer_phone, status) {
  let payment = await knex('purchase').where({ id_payment: id })
  console.log(payment)
  if (!payment.id) {
    try{
      await knex('purchase').insert({
        id: v4(),
        id_payment: id,
        buyer_name,
        buyer_email,
        buyer_phone,
        first_email_sent: 0,
        second_email_sent: 0,
        status
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  var [{ first_email_sent, second_email_sent }] = await knex('purchase').where({ id_payment: id })
  
    
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