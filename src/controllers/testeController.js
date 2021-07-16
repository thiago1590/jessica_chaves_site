const knex = require('../database')
const sendEmail = require('../services/sendEmail')
const {v4} = require('uuid')

    async function listenPurchaseService(req,res) {
      let {id,buyer_email,status} = req.body

      let [{first_email_sent, second_email_sent}] = 
           await knex('purchase')
           .select('first_email_sent','second_email_sent')
           .where({id_payment:id})
      
      if(status == 'pending') {
          if(first_email_sent == 0) {
            sendEmail() //params: email,first
            
            try {
                await knex('purchase').insert({
                    id: v4(),
                    id_payment: id,
                    buyer_email,
                    first_email_sent: 1,
                    second_email_sent:0,
                    status: status
                })
                return res.status(200).send('sent first email')
            }  catch(err) {
              return res.send(err.message)
            }
          }
        return res.status(200).send('first email already sent')
      }

      if(status == 'approved') {
          if(second_email_sent == 0) {
             sendEmail() //params: email,second

             if(!await knex('purchase').where({id_payment:id})) {
                try {
                  await knex('purchase').insert({
                      id: v4(),
                      id_payment: id,
                      buyer_email,
                      first_email_sent: 1,
                      second_email_sent:1,
                      status: status
                  })
                  return res.status(200).send('sent second email')
                } 
                catch(err) {
                  res.send(err.message)
                }
            }
  
           try {
              await knex('purchase').update({second_email_sent:1}).where({id_payment:id}) 
              return res.status(200).send('sent second email')
           }  catch(err) {
            return res.send(err.message)
           }
          }
          return res.status(200).send('secoud email already sent')
      }

      return res.status(200).send('payment is not pending or approved')
    }

module.exports = listenPurchaseService