const express = require('express');
const routes = express.Router();

const paymentsController = require('../controllers/paymentsController');

routes.get('/checkout/:id/:email/:description/:amount', paymentsController.checkout)

routes.get('/success', (req, res) => {
    return res.render("html/client.html")
})

routes.get('/pending', (req, res) => {
    return res.render("html/cadastro.html")
})

routes.get('/failure', (req, res) => {
    return res.render("html/admin.html")
})

module.exports = routes;