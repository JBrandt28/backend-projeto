const express = require('express');
const user = express.Router();
const Usuario = require('../tabelas/usuario');

// Criando rotas
user.get('/usuarios', (req, res) => {
    Usuario.findAll()
        .then(usuarios => res.json(usuarios))
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ error: 'Erro ao buscar usuários.' });
        });
});

user.post('/usuarios', (req, res) => {
    Usuario.create(req.body)
        .then(usuario => res.json(usuario))
        .catch(error => {
            console.error('Erro ao criar usuário:', error);
            res.status(400).json({ error: 'Erro ao criar usuário.' });
        });
});

user.put('/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    Usuario.update(req.body, {
        where: { id: usuarioId }
    })
        .then(() => {
            return Usuario.findByPk(usuarioId);
        })
        .then(usuarioAtualizado => {
            if (usuarioAtualizado) {
                res.json(usuarioAtualizado);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar usuário:', error);
            res.status(400).json({ error: 'Erro ao atualizar usuário.' });
        });
});

user.delete('/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    Usuario.destroy({
        where: { id: usuarioId }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.json({ message: 'Usuário excluído com sucesso.' });
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        })
        .catch(error => {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).json({ error: 'Erro ao excluir usuário.' });
        });
});

module.exports = user;