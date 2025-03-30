const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Korumalı rotalar için JWT doğrulama middleware'i
const protect = async (req, res, next) => {
  try {
    let token;
    console.log('Auth headers:', req.headers.authorization);

    // Token'ı header'dan al
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Extracted token:', token);
    }

    // Token yoksa hata döndür
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ 
        success: false, 
        error: 'Bu işlem için yetkiniz yok' 
      });
    }

    try {
      // Token'ı doğrula
      console.log('Verifying token with secret:', process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'takasla3998');
      console.log('Decoded token:', decoded);

      // Kullanıcıyı bul
      const user = await User.findById(decoded.id);
      if (!user) {
        console.log('User not found with ID:', decoded.id);
        return res.status(401).json({
          success: false,
          error: 'Kullanıcı bulunamadı'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ 
        success: false, 
        error: 'Geçersiz token' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Sunucu hatası'
    });
  }
};

module.exports = { protect }; 