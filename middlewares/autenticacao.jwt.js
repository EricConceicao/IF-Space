const jwt = require('jsonwebtoken');

// Middleware para verificar o token em todas as rotas protegidas
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).redirect('/?erro=Erro de autenticação. Faça login novamente');
  }

  try {
    const decoded = jwt.verify(token, chave);
    req.usuario = decoded; // Armazena o payload decodificado na requisição para uso posterior
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authenticate;