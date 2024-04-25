const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios.controller');
const auth = require('../middlewares/autenticacao.jwt');
const feedbackControler = require('../controllers/feedback.controller');

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
	let info = req.query.info;
	const text = res.locals.text;
	const email = res.locals.email;

	res.render('contato', { layout: false, title: 'IF - Space | Contato', info, email, text });
});

router.get('/secreto', feedbackControler.listar);

router.post('/enviar', feedbackControler.enviar);

module.exports = router;
