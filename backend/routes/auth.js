// routes/auth.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../tokenUtils');

router.post('/verify', (req, res) => {
  const { token } = req.body;
  const decoded = verifyToken(token);

  if (decoded) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

module.exports = router;
