const Sequelize = require('sequelize');
const conexao = require('../conexao');

const Tarefas = conexao.define('tarefa', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: Sequelize.STRING(150),
        allowNull: false
    }
}, {
    timestamps: false
});

Tarefas.sync({
    alter: true
});

module.exports = Tarefas;