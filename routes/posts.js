const express = require('express');
const router = express.Router();


//Receber o post do usuário em que você acessou 
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    res.render('principal/userpost', { id: id })
});

//Receber a página para fazer uma postagem
router.get('/', (req, res, next) => {
    //Se não carregar o cookie. Ele irá renderizar a página ainda
    let name = typeof req.cookies.name !== 'undefined' ? req.cookies.name : '';

    res.render('principal/post', { name })
});

//Submeter o post
router.post('/', (req, res, next) => {
    res.end('<h1>Postou com sucesso!<h1>');
});

module.exports = router;