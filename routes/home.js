var express = require('express');
var router = express.Router();


// Renderiza a página inicial com o nome do usuário
router.get('/', (req, res, next) => {
    res.render('principal/home', { name: req.cookies.name }); //Só pra aparecer de exemplo no title
});
router.get('/profile', (req, res, next) => {//Vai ter um parâmetro 'id' aqui depois
    //Se não carregar o cookie. Ele irá renderizar a página ainda
    let name = typeof req.cookies.name !== 'undefined' ? req.cookies.name : ''; 
    
    res.render('principal/profile', { name });
});

module.exports = router;