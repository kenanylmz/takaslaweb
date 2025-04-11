const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Başlık gereklidir"],
    trim: true,
    maxlength: [100, "Başlık 100 karakterden uzun olamaz"],
  },
  category: {
    type: String,
    required: [true, "Kategori gereklidir"],
    enum: [
      "Elektronik",
      "Giyim",
      "Kitap",
      "Mobilya",
      "Spor",
      "Koleksiyon",
      "Bahçe",
      "Oyuncak",
      "Diğer",
    ],
  },
  description: {
    type: String,
    required: [true, "Açıklama gereklidir"],
    maxlength: [1000, "Açıklama 1000 karakterden uzun olamaz"],
  },
  city: {
    type: String,
    required: [true, "Şehir gereklidir"],
  },
  condition: {
    type: String,
    enum: [
      "Sıfır",
      "Yeni Gibi",
      "İyi",
      "Az Kullanılmış",
      "Normal",
      "Yıpranmış",
    ],
    required: [true, "Ürün durumu gereklidir"],
  },
  images: [String],
  status: {
    type: String,
    enum: ["active", "inactive", "completed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Listing", ListingSchema);
