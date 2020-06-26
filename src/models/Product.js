const connection = require('../database/connection');
const Sequelize = require('sequelize');

const Product = connection.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

try {
    Product.sync({
        force: false
    });
} catch (error) {
    console.log(`Erro: ${error}`);
}

module.exports = Product;