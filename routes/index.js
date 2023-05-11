const express = require('express');
const router = express.Router();

//Importando as funções do controller.
const usuariosController = require('../controllers/usuarios.controller');

/* GET renderiza a página de login. */
router.get('/', (req, res, next) => {
	res.render('index');
});

/* GET página contato. */
router.get('/contato', (req, res, next) => {
	res.render('contato', { title: 'IF - Space | Contato' });
});

/* GET renderiza a página de cadastro. */
router.get('/signup', (req, res, next) => {
	res.render('singup');
});

/* POST Login */
router.post('/login', usuariosController.login);

/* POST para cadastrar. */
router.post('/signup', usuariosController.cadastrar);

module.exports = router;
