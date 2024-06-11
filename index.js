const express = require('express');
const cors = require('cors');
const app = express();
const usuarios = require('./conexao')
const Tarefas = require('./tarefa')

app.use(express.json());
app.use(cors());

app.post('/usuarios', (req, res) => {
    
    Tarefas.create(req.body)
    .then(() => res.json('cadastro feito.'));

});
app.get('/usuarios', (req, res) => {
    res.json('olá');
})

app.listen(4300, () => {
    console.log('Conectou.');
})