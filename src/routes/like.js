const express = require('express');
const router = express.Router();

const auth = require('../middlewares/autenticacao.jwt');
const likeController = require('../controllers/like.controller');

router.post('/:id/:postId', auth, likeController.curtir);

router.post('/deixar/:id/:postId', auth, likeController.descurtir);

module.exports = router;