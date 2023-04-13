var express = require('express');
var router = express.Router();

/* GET página inicial. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET página contato. */
router.get('/contato', function(req, res, next) {
  res.render('contato', { title: 'IF - Space | Contato' });
});

/* GET página cadastro. */
router.get('/cadastro', function(req, res, next) {
  res.render('singup');
});

/* GET página cadastro. */
router.post('/cadastro', function(req, res, next) {
  res.render('index');
});

module.exports = router;
