const express = require('express');
const router = express.Router();
const auth = require('../middlewares/autenticacao.jwt');
const postagensController = require('../controllers/postagens.controller');

// Renderiza a página inicial com o nome do usuário
router.get('/', auth, postagensController.exibirPostagens);

// Rota para o logout
router.get('/logout', (req, res) => {
    // Sumir com o cookie
    res.clearCookie('Auth');

    // Limpar o payload do token
    req.usuario = null;
    res.redirect('/?info=Até logo');
});

module.exports = router;