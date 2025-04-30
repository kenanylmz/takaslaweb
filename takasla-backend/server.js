const dotenv = require("dotenv");
// Ortam değişkenlerini hemen yükle - bu satır en üstte olmalı
dotenv.config();

// .env değişkenlerini kontrol et
console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("NODE_ENV:", process.env.NODE_ENV);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Veritabanına bağlan
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Statik dosyalar için klasör
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API rotaları
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/swaps", require("./routes/swapRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// Ana rota
app.get("/", (req, res) => {
  res.send("Takasla API çalışıyor!");
});

// Port yapılandırması
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
