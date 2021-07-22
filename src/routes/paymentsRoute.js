const express = require('express');
const routes = express.Router();
require('dotenv').config()

const paymentsController = require('../controllers/paymentsController');

routes.get('/payments/checkout/:email/:amount', paymentsController.checkout)
routes.get('/purchases', paymentsController.listPurchases)
routes.post('/listenPayment', paymentsController.listenPurchase)

module.exports = routes;