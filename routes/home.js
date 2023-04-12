var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    let email = req.body.email;
    res.render('principal/home', { name: email }); //Só pra aparecer de exemplo no title
});

router.get('/profile', (req, res, next) => {
    res.render('principal/profile');
})

module.exports = router;