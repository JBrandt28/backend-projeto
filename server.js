const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Usuario = require('./Usuario');

const app = express();
const port = 4300;

app.use(cors());
app.use(bodyParser.json());

// Rota para adicionar usuário
app.post('/usuarios', async (req, res) => {
    const { primeiroNome, ultimoNome, idade, email, senha } = req.body;
    try {
        const novoUsuario = await Usuario.create({
            primeiro_nome: primeiroNome,
            ultimo_nome: ultimoNome,
            idade: idade,
            email: email,
            senha: senha
        });
        res.status(200).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).send('Erro ao inserir dados');
    }
});

// Rota para obter todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).send('Erro ao buscar dados');
    }
});

// Rota para atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { primeiroNome, ultimoNome, idade, email, senha } = req.body;
    try {
        await Usuario.update({
            primeiro_nome: primeiroNome,
            ultimo_nome: ultimoNome,
            idade: idade,
            email: email,
            senha: senha
        }, {
            where: { id: id }
        });
        res.status(200).send('Usuário atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        res.status(500).send('Erro ao atualizar dados');
    }
});

// Rota para excluir usuário
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Usuario.destroy({
            where: { id: id }
        });
        res.status(200).send('Usuário excluído com sucesso');
    } catch (error) {
        console.error('Erro ao excluir dados:', error);
        res.status(500).send('Erro ao excluir dados');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
