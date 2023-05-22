var express = require('express');
var router = express.Router();


// Renderiza a página inicial com o nome do usuário
router.get('/', (req, res, next) => {
    
    if (req.session.usuario.nick) {
        const { nick } = req.session.usuario;
        res.render('principal/home', { name: nick});
    } else {
        const { pNome } = req.session.usuario;
        res.render('principal/home', { name: pNome});
    }
});

router.get('/profile', (req, res, next) => {//Vai ter um parâmetro 'id' aqui depois
    if (req.session.usuario.nick) { //Se o usuário tiver um nick. O rendezira primeiro
        const { nick } = req.session.usuario;
        res.render('principal/profile', { name: nick});
    } else {
        const { pNome } = req.session.usuario;
        res.render('principal/profile', { name: pNome});
    }
});

module.exports = router;