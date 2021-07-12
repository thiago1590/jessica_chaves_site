const express = require('express');
const routes = express.Router();

require('dotenv').config()

const paymentsController = require('../controllers/paymentsController');
const paymentMiddleware = require('../middlewares/paymentMiddleware')

routes.get('/payments/checkout/:id/:email/:description/:amount', paymentsController.checkout)

routes.get('/success', (req, res) => {
    return res.render("html/home.html")
})

routes.get('/pending', (req, res) => {
    return res.render("html/pending.html")
})

routes.get('/failure', (req, res) => {
    return res.render("html/failure.html")
})

routes.get('/register', (req, res) => {
    return res.render("html/register.html")
})

routes.post('/listenPayment', paymentsController.listenPurchase)

routes.get('/v1/payments/:id', paymentsController.getBuyerInfo)

routes.get('/buyers', paymentsController.listBuyers)

routes.get('/testeRedirect1', paymentsController.testeRedirect1)
routes.get('/testeRedirect2/:teste', paymentsController.testeRedirect2)


module.exports = routes;