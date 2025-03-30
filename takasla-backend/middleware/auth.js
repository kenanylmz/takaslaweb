const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Korumalı rotalar için JWT doğrulama middleware'i
const protect = async (req, res, next) => {
  let token;

  // Token'ı header'dan al
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Token yoksa hata döndür
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Bu işlem için yetkiniz yok' 
    });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı bul
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: 'Geçersiz token' 
    });
  }
};

module.exports = { protect }; 