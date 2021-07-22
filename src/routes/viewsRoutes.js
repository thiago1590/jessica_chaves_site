const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.status(200).render("html/home.html")
})
routes.get('/register', (req, res) => {
    return res.render("html/register.html")
})
routes.get('/payments/success', (req, res) => {
    return res.render("html/success.html")
})
routes.get('/payments/pending', (req, res) => {
    return res.render("html/pending.html")
})
routes.get('/payments/failure', (req, res) => {
    return res.render("html/failure.html")
})


module.exports = routes;