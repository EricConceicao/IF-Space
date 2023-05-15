var express = require('express');
var router = express.Router();


// Renderiza a página inicial com o nome do usuário
router.get('/', (req, res, next) => {
    const pNome = req.session.usuario.pNome;
    res.render('principal/home', { name: pNome});
});

router.get('/profile', (req, res, next) => {//Vai ter um parâmetro 'id' aqui depois
    const pNome = req.session.usuario.pNome;
    res.render('principal/profile', { name: pNome});
});

module.exports = router;