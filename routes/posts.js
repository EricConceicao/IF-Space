const express = require('express');
const router = express.Router();

const auth = require('../middlewares/autenticacao.jwt');
const postagensController = require('../controllers/postagens.controller');
const seguirController = require('../controllers/seguir.controller');

//Receber a página para fazer uma postagem
router.get('/', auth, seguirController.listarSeguidos, (req, res, next) => {
    let info = req.query.info;
    
    const { foto, banner } = req.usuario;
    const { nick } = req.usuario;
    
    res.render('principal/post', { name: nick, title: 'IF - Space | Faça um postagem', info, foto, banner });
    
});

//Receber o post do usuário em que você acessou 
router.get('/user/:id', auth, seguirController.listarSeguidos, postagensController.exibirPaginaDoPost);

//Submeter o post
router.post('/', auth, postagensController.postar);

module.exports = router;