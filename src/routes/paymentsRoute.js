const express = require('express');
const routes = express.Router();
require('dotenv').config()

const paymentsController = require('../controllers/paymentsController');
const sendEmail = require('../services/sendEmailTesting');

routes.get('/payments/checkout/:id/:email/:description/:amount', paymentsController.checkout) //remover description e amount qnd terminar de testar
routes.get('/purchases', paymentsController.listPurchases)
routes.post('/listenPayment', paymentsController.listenPurchase)

//testing
routes.get('/sendEmail', (req,res) => {
    sendEmail()
    res.send('ok')
})

module.exports = routes;