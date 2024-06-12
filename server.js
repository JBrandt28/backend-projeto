const express = require('express');
const cors = require('cors');
const app = express();
const Usuario = require('./Usuario');

app.use(express.json());
app.use(cors());

app.post('/usuarios', (req, res) => {
    Tarefas.create(req.body)
        .then(() => res.json('Cadastro feito.'));
});

app.get('/usuarios', (req, res) => {
    // Implemente aqui a lógica para obter todos os usuários
});

app.put('/usuarios/:id', (req, res) => {
    // Implemente aqui a lógica para atualizar um usuário
});

app.delete('/usuarios/:id', (req, res) => {
    // Implemente aqui a lógica para excluir um usuário
});

app.listen(4300, () => {
    console.log('Servidor rodando.');
});
