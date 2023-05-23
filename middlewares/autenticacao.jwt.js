const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

// Middleware para verificar o token em todas as rotas protegidas
async function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('auth - token recebido: ', token)

  if (!token) {
    return res.status(401).render('index', {erro: 'Falha na autenticação' });
  }

  try {
    const chave = await Usuario.procurarChave(req.body.email);
    if (chave) {

      const decoded = jwt.verify(token, chave);
      req.usuario = decoded; // Armazena o payload decodificado na requisição para uso posterior

      next();

    } else {
      console.error('Chave não encontrada, ou inválida')
    }
    
    
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = auth;