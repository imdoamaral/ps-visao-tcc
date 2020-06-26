const express = require('express');
const app = express();
const routes = require('./routes');
const connection = require('./database/connection');

const port = process.env.PORT || 3000;

try {
    connection.authenticate();
} catch (error) {
    console.log(`Erro: ${error}`);
}

// View engine EJS p/ formatar os dados do backend no html
app.set('view engine', 'ejs');

// Habilitando o body do html
app.use(express.urlencoded({
    extended: true,
}));

// Habilitar arquivos estáticos (.css e .js);
app.use(express.static('./public'));

app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});