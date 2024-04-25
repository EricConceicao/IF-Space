const express = require('express');
const router = express.Router();

const auth = require('../middlewares/autenticacao.jwt');
const commentController = require('../controllers/comment.controller');

router.post('/:id/:postId', auth, commentController.comentar);

module.exports = router;