const express = require('express');
const router = express.Router();

const auth = require('../middlewares/autenticacao.jwt');
const usuariosController = require('../controllers/usuarios.controller');
const seguirController = require('../controllers/seguir.controller');
const postagensController = require('../controllers/postagens.controller')
const { uploadFoto } = require('../middlewares/Uploads');

router.get('/', auth, seguirController.listarSeguidos, postagensController.exibirPostsDoUsuario, usuariosController.exibirPerfil);

router.get('/:id', auth, seguirController.listarSeguidos, postagensController.exibirPostsDoUsuario ,usuariosController.exibirPerfil);

router.post('/atualizar', auth, usuariosController.editar);

router.post('/upload', auth, uploadFoto.single('image'), usuariosController.upload);

module.exports = router;