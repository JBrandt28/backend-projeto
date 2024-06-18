const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Tarefas = require('./tarefa');
const Usuario = require('./Usuario');
const app = express();
const port = 4300;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Login

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const usuario = await Usuario.findOne({ where: { email } });
    
    if (!usuario) {
      // Usuário não encontrado
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const senhaValida = password === usuario.password;
    if (!senhaValida) {
      // Senha incorreta
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
  

// Usuários
app.post('/usuarios', async (req, res) => {
  try {
    const { primeiro_nome, ultimo_nome, idade, email, password } = req.body;

    const newUser = await Usuario.create({
      primeiro_nome,
      ultimo_nome,
      idade,
      email,
      password
    });

    res.json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const { primeiro_nome, ultimo_nome, idade, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await Usuario.update(
      { primeiro_nome, ultimo_nome, idade, email, password: hashedPassword },
      { where: { id: usuarioId } }
    );

    const usuarioAtualizado = await Usuario.findByPk(usuarioId);

    if (usuarioAtualizado) {
      res.json(usuarioAtualizado);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(400).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// Rotas de tarefas
app.post('/tarefas', (req, res) => {
  Tarefas.create(req.body)
    .then(() => res.json('Cadastro de tarefa feito.'))
    .catch(error => {
      console.error('Erro ao criar tarefa:', error);
      res.status(400).json({ error: 'Erro ao criar tarefa.' });
    });
});

app.get('/tarefas', (req, res) => {
  res.json('olá');
});

app.get('/usuarios', (req, res) => {
  Usuario.findAll()
    .then(usuarios => res.json(usuarios))
    .catch(error => {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    });
});

app.delete('/usuarios/:id', (req, res) => {
  const usuarioId = req.params.id;

  Usuario.destroy({
    where: { id: usuarioId },
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
