const express = require('express');
const router = express.Router();
const auth = require('../middlewares/autenticacao.jwt');
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', auth, usuariosController.exibirPerfil);

router.post('/atualizar', auth, usuariosController.editar);

/* router.post('/upload', ) */

module.exports = router;