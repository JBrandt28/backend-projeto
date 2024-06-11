const Sequelize = require('sequelize');
const conexao = require('./conexao');

const Usuario = conexao.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    primeiro_nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    ultimo_nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
});

Usuario.sync({
    alter: true
});

module.exports =Usuario;
