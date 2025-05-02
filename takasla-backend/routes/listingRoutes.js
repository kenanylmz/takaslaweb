const express = require("express");
const router = express.Router();
const {
  createListing,
  getUserListings,
  deleteListing,
  getListing,
  updateListing,
  getAllListings,
  getPublicListing,
} = require("../controllers/listingController");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getAllListings);
router.get("/public/:id", getPublicListing);

// Protected routes
router.post("/", protect, upload.array("images", 5), createListing);
router.get("/me", protect, getUserListings);
router.delete("/:id", protect, deleteListing);
router.get("/:id", protect, getListing);
router.put("/:id", protect, upload.array("images", 5), updateListing);

module.exports = router;
