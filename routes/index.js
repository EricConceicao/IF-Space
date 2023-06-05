const express = require('express');
const router = express.Router();

//Importando as funções do controller.
const usuariosController = require('../controllers/usuarios.controller');
const auth = require('../middlewares/autenticacao.jwt');

/* GET renderiza a página de login. */
router.get('/', (req, res, next) => {
	let info = req.query.info;
	res.render('index', { layout: './layouts/layout-index', title: 'IF - Space | Login', info });	
});

/* POST Login */
router.post('/login', usuariosController.login);

/* GET renderiza a página de cadastro. */
router.get('/signup', (req, res, next) => {
	res.render('singup', { layout: 'layouts/layout-index', title: 'IF - Space | Cadastro'});
});

/* POST para cadastrar. */
router.post('/signup', usuariosController.cadastrar);

/* GET página contato. */
router.get('/contato', (req, res, next) => {
	res.render('contato', { layout: 'layouts/layout-index', title: 'IF - Space | Contato' });
});

module.exports = router;
