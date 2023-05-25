var express = require('express');
var router = express.Router();
const auth = require('../middlewares/autenticacao.jwt');

// Renderiza a página inicial com o nome do usuário
router.get('/', auth, (req, res, next) => {
    console.log('Usuario:', req.usuario);
    if (req.usuario.nick) {
        const { nick } = req.usuario;
        res.render('principal/home', { name: nick });
    } else {
        const { pNome } = req.usuario;
        res.render('principal/home', { name: pNome });
    }
});

router.get('/profile', auth, (req, res, next) => {//Vai ter um parâmetro 'id' aqui depois
    if (req.usuario.nick) { //Se o usuário tiver um nick. O rendezira primeiro
        const { nick } = req.usuario;
        res.render('principal/profile', { name: nick });
    } else {
        const { pNome } = req.usuario;
        res.render('principal/profile', { name: pNome });
    }
});

// Rota para o logout
router.get('/logout', (req, res) => {
    // Sumir com o cookie
    res.clearCookie('Auth');

    // Limpar o payload do token
    req.usuario = null;
    console.log('Usuario:', req.usuario);
    res.redirect('/?info=Até logo o/');
});

module.exports = router;