const express = require("express");
const router = express.Router();
const { getAiSwapSuggestions } = require("../controllers/aiController");
const { protect } = require("../middleware/auth");

router.post("/swap-suggestions", protect, getAiSwapSuggestions);

module.exports = router;
