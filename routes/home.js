var express = require('express');
var router = express.Router();


// Renderiza a página inicial com o nome do usuário
router.get('/', (req, res, next) => {
    let name = req.cookies.name;
    res.render('principal/home', { name }); //Só pra aparecer de exemplo no title
});

router.get('/profile', (req, res, next) => {
    res.render('principal/profile');
});

module.exports = router;