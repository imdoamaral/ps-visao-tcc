const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/ProductController');

routes.get('/', (req, res) => {
    return res.render('index');
});

routes.get('/products', ProductController.index);

module.exports = routes;