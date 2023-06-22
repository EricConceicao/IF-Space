const express = require('express');
const router = express.Router();
const auth = require('../middlewares/autenticacao.jwt');
const usuariosController = require('../controllers/usuarios.controller');
const uploadFoto = require('../middlewares/Uploads');

router.get('/', auth, usuariosController.exibirPerfil);

router.post('/atualizar', auth, usuariosController.editar);

// Seguir um usuário
router.post('/seguir/:id', auth, usuariosController.seguir);

router.post('/upload', auth, uploadFoto.single('image'), usuariosController.upload);

module.exports = router;