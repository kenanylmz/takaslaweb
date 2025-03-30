const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // .env dosyasından yüklemeyi dene, çalışmazsa sabit URI kullan
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/takasla';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 