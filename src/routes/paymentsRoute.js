const express = require('express');
const routes = express.Router();
const MercadoPago = require('mercadopago');

const paymentsController = require('../controllers/paymentsController');

routes.get('/payments/checkout/:id/:email/:description/:amount', paymentsController.checkout)

routes.get('/success', (req, res) => {
    return res.render("html/home.html")
})

routes.get('/pending', (req, res) => {
    return res.render("html/register.html")
})

routes.get('/failure', (req, res) => {
    return res.render("html/register.html")
})

routes.get('/register', (req, res) => {
    return res.render("html/register.html")
})

routes.post('/', (req, res) => {
    let {data} = req.body
    console.log(`id_pagamento: ${data.id}`)
    return res.status(200).send(data.id)
})

routes.get('/v1/payments/:id', (req,res) => {
    MercadoPago.configure({
        sandbox: false,
        access_token: 'APP_USR-6245134050800709-052902-27d21be63f5445672496842bd0eba048-156098999'
    });
    console.log(req.body)
    return res.status(200).json(req.body)
} )

module.exports = routes;