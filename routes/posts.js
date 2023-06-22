const express = require('express');
const router = express.Router();
const auth = require('../middlewares/autenticacao.jwt');
const postagensController = require('../controllers/postagens.controller');

//Receber a página para fazer uma postagem
router.get('/', auth, (req, res, next) => {
    let info = req.query.info;
    if (req.usuario.nick) {
        const { nick } = req.usuario;
        res.render('principal/post', { name: nick, title: 'IF - Space | Faça um postagem', info });
    }
});

//Receber o post do usuário em que você acessou 
router.get('/user/:id', auth, postagensController.exibirPaginaDoPost);

//Submeter o post
router.post('/', auth, postagensController.postar);

module.exports = router;