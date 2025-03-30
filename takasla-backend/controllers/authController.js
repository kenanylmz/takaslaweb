const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Kullanıcı kaydı
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    console.log('Register request body:', req.body);
    const { name, email, password } = req.body;

    // Email zaten kullanılmış mı kontrol et
    let user = await User.findOne({ email });

    if (user) {
      console.log('Email already in use:', email);
      return res.status(400).json({
        success: false,
        error: 'Bu email adresi zaten kullanılıyor'
      });
    }

    // Yeni kullanıcı oluştur
    user = new User({
      name,
      email,
      password
    });

    console.log('Saving user...');
    await user.save();
    console.log('User saved successfully with ID:', user._id);

    // JWT token oluştur
    console.log('Generating JWT token...');
    const token = user.getSignedJwtToken();
    console.log('JWT token generated');

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Register error details:', error);
    res.status(500).json({
      success: false,
      error: 'Sunucu hatası: ' + error.message
    });
  }
};

// @desc    Kullanıcı girişi
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Login validation errors:', errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    console.log('Login request body:', req.body);
    const { email, password } = req.body;

    // Kullanıcıyı bul ve şifreyi de getir
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('User not found with email:', email);
      return res.status(401).json({
        success: false,
        error: 'Email veya şifre hatalı'
      });
    }

    // Şifreyi kontrol et
    console.log('Checking password...');
    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Email veya şifre hatalı'
      });
    }

    // JWT token oluştur
    console.log('Generating login JWT token...');
    const token = user.getSignedJwtToken();
    console.log('Login JWT token generated');

    // Son aktiviteyi güncelle
    user.lastActive = Date.now();
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Login error details:', error);
    res.status(500).json({
      success: false,
      error: 'Sunucu hatası: ' + error.message
    });
  }
};

// @desc    Mevcut kullanıcı bilgisini getir
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Sunucu hatası'
    });
  }
}; 