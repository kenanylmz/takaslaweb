// Global hata işleme yardımcı fonksiyonu
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log hatası
  console.log(err);

  // Mongoose hata tipleri
  if (err.name === 'CastError') {
    const message = `Geçersiz ${err.path}`;
    error = { message, statusCode: 400 };
  }

  if (err.code === 11000) {
    const message = 'Bu değer zaten var';
    error = { message, statusCode: 400 };
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Sunucu hatası'
  });
};

module.exports = errorHandler; 