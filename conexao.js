const Sequelize = require('sequelize');

const conexao = new Sequelize('note', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

conexao.authenticate()
.then(() => {
    console.log('Banco conectado.');
})
.catch(erro => {
    console.log('Banco não conectado.', erro);
});

module.exports = conexao;