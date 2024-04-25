const express = require('express');
const router = express.Router();

const auth = require('../middlewares/autenticacao.jwt');
const seguirController = require('../controllers/seguir.controller');

// Seguir um usuário
router.post('/:id/:pid', auth, seguirController.seguir);

router.post('/deixar/:id/:pid', auth, seguirController.deixarId);

module.exports = router;