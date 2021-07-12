const knex = require('../database')

module.exports = {
    async listen(req,res, next){
      try {
        let {data:{id}} = req.body
        req.idPayment = id
        return next()

      } catch(err) {
        res.status(500).json({"erro": err.message})
      }
    },
}