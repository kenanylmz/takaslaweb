const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// İleride doldurulacak
router.get('/', (req, res) => {
  res.json({ message: 'Swaps API' });
});

module.exports = router; 