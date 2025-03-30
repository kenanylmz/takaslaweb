const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateUserProfile, 
  uploadProfileImage,
  changePassword
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/profile/upload-image', protect, upload.single('profileImage'), uploadProfileImage);
router.put('/profile/change-password', protect, changePassword);

module.exports = router; 