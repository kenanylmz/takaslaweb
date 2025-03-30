const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { check } = require('express-validator');

// Validation middleware
const registerValidation = [
  check('name', 'İsim alanı zorunludur').not().isEmpty(),
  check('email', 'Geçerli bir email adresi giriniz').isEmail(),
  check('password', 'Şifre en az 6 karakter olmalıdır').isLength({ min: 6 })
];

const loginValidation = [
  check('email', 'Geçerli bir email adresi giriniz').isEmail(),
  check('password', 'Şifre gereklidir').exists()
];

// Rotalar
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router; 