const express = require('express');
const router = express.Router();

const auth = require('../middlewares/autenticacao.jwt');
const usuariosController = require('../controllers/usuarios.controller');
const seguirController = require('../controllers/seguir.controller');
const postagensController = require('../controllers/postagens.controller');
const { uploadFoto, uploadBanner } = require('../middlewares/Uploads');

router.get('/', auth, seguirController.listarSeguidos, postagensController.exibirPostsDoUsuario, usuariosController.exibirPerfil);

router.get('/:id', auth, seguirController.listarSeguidos, postagensController.exibirPostsDoUsuario ,usuariosController.exibirPerfil);

router.post('/atualizar', auth, usuariosController.editar);

router.post('/upload/foto', auth, uploadFoto.single('foto'), usuariosController.upload);

router.post('/upload/banner', auth, uploadBanner.single('banner'), usuariosController.upload);

module.exports = router;