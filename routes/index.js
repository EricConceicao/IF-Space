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
 /* GET página equipe. */
 router.get('/equipe', function(req, res, next) {
  res.render('equipe', { title: 'IF - Space | Equipe' });
 });
 /* GET página sobre. */
 router.get('/sobre', function(req, res, next) {
  res.render('sobre', { title: 'IF - Space | Sobre' });
 });
module.exports = router;
