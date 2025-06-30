const { verify } = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user_id = decoded.id; // ou outro campo que você gravou no token
    next();
  });
};

module.exports = verifyJWT;
