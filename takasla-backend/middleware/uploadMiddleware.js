const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');

// Uploads klasörünü oluştur (yoksa)
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads directory created');
}

// Dosya depolama ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Benzersiz dosya adı oluştur
    const randomName = crypto.randomBytes(16).toString('hex');
    cb(null, `${Date.now()}-${randomName}${path.extname(file.originalname)}`);
  }
});

// Sadece resim dosyalarının yüklenmesine izin ver
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Yalnızca resim dosyaları yüklenebilir! (.jpeg, .jpg, .png, .gif, .webp)'));
  }
};

// Multer ayarlarını yapılandır
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB maksimum
  fileFilter: fileFilter
});

module.exports = { upload }; 