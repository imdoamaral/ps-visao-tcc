const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/ProductController');

// Rotas para acessar páginas:
routes.get('/', (req, res) => {
    return res.render('index');
});

routes.get('/cardapio', (req, res) => {
    return res.render('cardapio');
});

routes.get('/carrinho', (req, res) => {
    return res.render('carrinho');
});

routes.get('/contato', (req, res) => {
    return res.render('contato');
});

routes.get('/quem_somos', (req, res) => {
    return res.render('quem-somos');
});

routes.get('/products', ProductController.index);

module.exports = routes;