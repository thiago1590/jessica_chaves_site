const knex = require('../database')

module.exports = {
    async listen(req,res, next){
        
      try {
        let {data} = req.body

        await knex('buyers').insert({
          idPayment: data.id,
          email: 'teste@gmail.com'
        })
        res.status(200).send('ok')
        req.idPayment = data.id
        next()

      } catch(err) {
        res.status(500).json({"erro": err.message})
      }
    },
}