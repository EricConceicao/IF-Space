const express = require('express');
const router = express.Router();
const auth = require('../middlewares/autenticacao.jwt');
const postagensController = require('../controllers/postagens.controller');

//Receber o post do usuário em que você acessou 
router.get('/user/:id', auth, postagensController.exibirPaginaDoPost);

//Receber a página para fazer uma postagem
router.get('/', auth, (req, res, next) => {
    let info = req.query.info;
    if (req.usuario.nick) {
        const { nick } = req.usuario;
        res.render('principal/post', { name: nick, info });
    } else {
        const { pNome } = req.usuario;
        res.render('principal/post', { name: pNome, info });
    }
});

//Submeter o post
router.post('/', auth, postagensController.postar);

module.exports = router;