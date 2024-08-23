const express = require('express');
const login = express.Router();
const Usuario = require('../tabelas/usuario');
const jwt = require('jsonwebtoken');

login.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received with email:', email);
    

    try {
        // Verificar se o usuário existe no banco de dados
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            console.log('Usuário não encontrado para email:', email);
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        // Verificar se a senha está correta
        const senhaValida = password === usuario.password; // Alterado para 'password'
        if (!senhaValida) {
            console.log('Senha inválida para email:', email);
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gerar token de autenticação
        const token = jwt.sign({ id: usuario.id }, 'seu_segredo', { expiresIn: '1h' });

        // Retornar o token
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao fazer login' });
    }
});

module.exports = login;
