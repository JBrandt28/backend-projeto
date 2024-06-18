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
        allowNull: false,
        validate: {
            len: [2, 50] // Limita o comprimento entre 2 e 50 caracteres
        }
    },
    ultimo_nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
            len: [2, 50] // Limita o comprimento entre 2 e 50 caracteres
        }
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 18 // Valida que a idade é maior ou igual a 18
        }
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, // Adicionei uma restrição de unicidade para o email
        validate: {
            isEmail: true // Valida se é um email válido
        }
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    data_registro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Define a data de registro como a data atual
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
