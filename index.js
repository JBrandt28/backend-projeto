const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173' // URL do frontend
}));
app.use(express.json());

const tarefaRoutes = require('./controlador/controladorTarefa');
const usuarioRoutes = require('./controlador/controladorUsuario');
const loginRoutes = require('./controlador/controladorLogin');

app.use(loginRoutes);
app.use(tarefaRoutes); 
app.use(usuarioRoutes);

app.listen(4300, () => {
    console.log('Conectou.');
});
