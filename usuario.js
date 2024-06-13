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
        allowNull: false,
        unique: true // Adicionei uma restrição de unicidade para o email
    },
    senha: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
});

Usuario.sync({ alter: true })
    .then(() => {
        console.log('Tabela de usuários sincronizada');
    })
    .catch((err) => {
        console.error('Erro ao sincronizar tabela de usuários:', err);
    });

module.exports = Usuario;
