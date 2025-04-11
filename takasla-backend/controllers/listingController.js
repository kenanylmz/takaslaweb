const Listing = require("../models/Listing");
const fs = require("fs");
const path = require("path");

// @desc    Yeni ilan oluştur
// @route   POST /api/listings
// @access  Private
exports.createListing = async (req, res) => {
  try {
    const { title, category, description, city, condition } = req.body;

    console.log("Alınan veriler:", {
      title,
      category,
      description,
      city,
      condition,
    });

    // Zorunlu alanların kontrolü
    if (!title || !category || !description || !city || !condition) {
      return res.status(400).json({
        success: false,
        error:
          "Tüm zorunlu alanları doldurun (başlık, kategori, açıklama, şehir, durum)",
      });
    }

    // İlan oluştur
    const listing = await Listing.create({
      title,
      category,
      description,
      city,
      condition,
      user: req.user.id,
      images: req.files ? req.files.map((file) => file.filename) : [],
    });

    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("İlan oluşturma hatası:", error);
    res.status(500).json({
      success: false,
      error: "İlan oluşturulurken bir hata oluştu: " + error.message,
    });
  }
};

// @desc    Kullanıcının ilanlarını getir
// @route   GET /api/listings/me
// @access  Private
exports.getUserListings = async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user.id }).sort(
      "-createdAt"
    );

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    console.error("İlanları getirme hatası:", error);
    res.status(500).json({
      success: false,
      error: "İlanlar yüklenirken bir hata oluştu",
    });
  }
};

// @desc    İlan sil
// @route   DELETE /api/listings/:id
// @access  Private
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: "İlan bulunamadı",
      });
    }

    // İlanın sahibi olduğunu kontrol et
    if (listing.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Bu işlem için yetkiniz yok",
      });
    }

    // İlan görsellerini sil
    if (listing.images && listing.images.length > 0) {
      listing.images.forEach((image) => {
        const imagePath = path.join(__dirname, "../uploads", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    await listing.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("İlan silme hatası:", error);
    res.status(500).json({
      success: false,
      error: "İlan silinirken bir hata oluştu",
    });
  }
};

// Tek bir ilanı getirme fonksiyonu ekleyin
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: "İlan bulunamadı",
      });
    }

    // İlanın sahibi olup olmadığını kontrol et
    if (listing.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Bu işlem için yetkiniz yok",
      });
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("İlan getirme hatası:", error);
    res.status(500).json({
      success: false,
      error: "İlan yüklenirken bir hata oluştu",
    });
  }
};

// İlan güncelleme fonksiyonu ekleyin
exports.updateListing = async (req, res) => {
  try {
    const { title, category, description, city, condition } = req.body;
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: "İlan bulunamadı",
      });
    }

    // İlanın sahibi olup olmadığını kontrol et
    if (listing.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Bu işlem için yetkiniz yok",
      });
    }

    // Güncellenecek verileri hazırla
    const updateData = {
      title: title || listing.title,
      category: category || listing.category,
      description: description || listing.description,
      city: city || listing.city,
      condition: condition || listing.condition,
      updatedAt: Date.now(),
    };

    // Eğer yeni resimler yüklendiyse
    if (req.files && req.files.length > 0) {
      // Mevcut resimler varsa koru
      const existingImages = req.body.existingImages
        ? Array.isArray(req.body.existingImages)
          ? req.body.existingImages
          : [req.body.existingImages]
        : [];

      // Yeni resim dosya adlarını al
      const newImages = req.files.map((file) => file.filename);

      // Tüm resimleri birleştir
      updateData.images = [...existingImages, ...newImages];

      // Kullanılmayan resimleri temizle
      const imagesToDelete = listing.images.filter(
        (img) => !existingImages.includes(img)
      );
      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach((image) => {
          const imagePath = path.join(__dirname, "../uploads", image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }
    }

    // İlanı güncelle
    listing = await Listing.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("İlan güncelleme hatası:", error);
    res.status(500).json({
      success: false,
      error: "İlan güncellenirken bir hata oluştu",
    });
  }
};
