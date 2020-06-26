const Product = require('../models/Product');

module.exports = {
    async index(req, res) {
        const products = await Product.findAll();

        return res.render('cardapio', {
            products
        });
    },

    async store(req, res) {
        const {
            name,
            price,
            description
        } = req.body;
        const product = await Product.create({
            name,
            price,
            description,
        });
        return res.redirect('teste', {
            product
        });
    },
}