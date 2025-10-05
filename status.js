// routes/status.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ bpm: 72, estado: 'activo' });
});

module.exports = router;