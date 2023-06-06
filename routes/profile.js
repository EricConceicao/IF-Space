const express = require('express');
const router = express.Router();
const auth = require('../middlewares/autenticacao.jwt');
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', auth, (req, res, next) => {//Vai ter um parâmetro 'id' aqui depois
    if (req.usuario) { 
        const { nick } = req.usuario;
        const info = req.query.info;
        res.render('principal/profile', { name: nick, title: 'IF - Space | Perfil', info });
    }
});

router.post('/atualizar', auth, usuariosController.editar);

module.exports = router;