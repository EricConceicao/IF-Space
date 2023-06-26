const express = require('express');
const router = express.Router();

const auth = require('../middlewares/autenticacao.jwt');
const postagensController = require('../controllers/postagens.controller');
const seguirController = require('../controllers/seguir.controller');

// Renderiza a home com as últimas postagens
router.get('/', auth, seguirController.listarSeguidos, postagensController.exibirPostagens);

// Rota para o logout
router.get('/logout', (req, res) => {
    // Sumir com o cookie
    res.clearCookie('Auth');

    // Limpar o payload do token
    req.usuario = null;
    res.redirect('/?info=Até logo');
});

module.exports = router;