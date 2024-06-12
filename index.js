const express = require('express');
const cors = require('cors');
const app = express();
//const usuarios = require('./conexao')
const Tarefas = require('./tarefa')
const Usuario = require('./Usuario')

app.use(express.json());
app.use(cors());

app.post('/tarefas', (req, res) => {
    
    Tarefas.create(req.body)
    .then(() => res.json('cadastro feito.'));

});
app.get('/tarefas', (req, res) => {
    res.json('olá');
})

app.listen(4300, () => {
    console.log('Conectou.');
})

//usuarios

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