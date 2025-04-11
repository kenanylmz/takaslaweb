const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const Listing = require("../models/Listing");

// @desc    Kullanıcı profilini getir
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Kullanıcı bulunamadı",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Sunucu hatası",
    });
  }
};

// @desc    Kullanıcı profilini güncelle
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone, location } = req.body;

    const updateData = {
      name: name || req.user.name,
      phone: phone || req.user.phone,
      location: location || req.user.location,
    };

    // Kullanıcı profilini güncelle
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Sunucu hatası",
    });
  }
};

// @desc    Profil resmi yükle
// @route   POST /api/users/profile/upload-image
// @access  Private
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Lütfen bir resim dosyası seçin",
      });
    }

    // Önceki profil resmini kontrol et ve varsayılan resim değilse sil
    const user = await User.findById(req.user.id);
    if (user.profileImage && user.profileImage !== "default-profile.jpg") {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        user.profileImage
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Yeni profil resmini kaydet
    await User.findByIdAndUpdate(req.user.id, {
      profileImage: req.file.filename,
    });

    res.status(200).json({
      success: true,
      data: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
      },
    });
  } catch (error) {
    console.error("Profil resmi yükleme hatası:", error);
    res.status(500).json({
      success: false,
      error: "Profil resmi yüklenirken bir hata oluştu",
    });
  }
};

// @desc    Şifre değiştir
// @route   PUT /api/users/profile/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Kullanıcıyı şifresiyle birlikte bul
    const user = await User.findById(req.user.id).select("+password");

    // Mevcut şifreyi doğrula
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Mevcut şifre yanlış",
      });
    }

    // Yeni şifreyi ayarla
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Şifre başarıyla değiştirildi",
    });
  } catch (error) {
    console.error("Şifre değiştirme hatası:", error);
    res.status(500).json({
      success: false,
      error: "Şifre değiştirilirken bir hata oluştu",
    });
  }
};

// @desc    Kullanıcı istatistiklerini getir
// @route   GET /api/users/stats
// @access  Private
exports.getUserStats = async (req, res) => {
  try {
    // Kullanıcıya ait ilan sayısını bul
    const listingsCount = await Listing.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: {
        listingsCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Sunucu hatası",
    });
  }
};
