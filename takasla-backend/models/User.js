const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "İsim alanı zorunludur"],
  },
  email: {
    type: String,
    required: [true, "Email alanı zorunludur"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Geçerli bir email adresi giriniz",
    ],
  },
  password: {
    type: String,
    required: [true, "Şifre alanı zorunludur"],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "default-profile.jpg",
  },
  location: {
    city: { type: String },
    district: { type: String },
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

// Şifreyi hashle
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Şifre doğrulama metodu
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    console.log('Comparing passwords...');
    console.log('Entered password:', enteredPassword);
    console.log('Stored password (hashed):', this.password);
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('Password match result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// JWT token oluşturma
UserSchema.methods.getSignedJwtToken = function() {
  try {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'takasla3998', {
      expiresIn: '30d'
    });
    return token;
  } catch (error) {
    console.error('JWT token generation error:', error);
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);
