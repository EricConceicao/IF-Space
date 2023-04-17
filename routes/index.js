var express = require('express');
var router = express.Router();


/* GET renderiza a página de login. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET página contato. */
router.get('/contato', function(req, res, next) {
  res.render('contato', { title: 'IF - Space | Contato' });
});

/* GET renderiza a página de cadastro. */
router.get('/signup', function(req, res, next) {
  res.render('singup');
});

/* POST Login para página inicial. */
router.post('/login', function(req, res, next) {
  res.cookie('name', req.body.email)
  res.redirect('/home');
});

/* POST para cadastrar. */
router.post('/signup', function(req, res, next) {
  res.render('index');
});

module.exports = router;
