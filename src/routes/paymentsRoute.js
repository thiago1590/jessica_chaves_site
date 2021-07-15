const express = require('express');
const routes = express.Router();
require('dotenv').config()

const paymentsController = require('../controllers/paymentsController');

routes.get('/payments/checkout/:id/:email/:description/:amount', paymentsController.checkout) //remover description e amount qnd terminar de testar
routes.get('/purchases', paymentsController.listPurchases)
routes.post('/listenPayment', paymentsController.listenPurchase)

module.exports = routes;