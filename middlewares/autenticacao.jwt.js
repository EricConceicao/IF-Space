const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

// Middleware para verificar o token em todas as rotas protegidas
async function auth(req, res, next) { 
  if (!req.cookies.Auth) {
    return res.redirect("/?info=Erro de autenticação");
  }

  const values = JSON.parse(req.cookies.Auth);
  
  try {
    const chave = await Usuario.chaveiro(values.id);

    if (chave) {

      const decoded = jwt.verify(values.token, chave);
      req.usuario = decoded; // Armazena o payload decodificado na requisição para uso posterior
      console.log('Autentiquei, em', chave);
      next();

    } else {
      res.clearCookies('Auth'); // Se livra do cookie para caso tenha algo errado com ele
      return res.redirect("/?info=Ocorreu algo inesperado. Faça login novamente.");
    }
    
    
  } catch (err) {
    res.clearCookies('Auth'); // Se livra do cookie caso tenha algo errado com ele
    return res.status(401).json({ message: err });
  }
}

module.exports = auth;