// scientistRoutes.js
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authMiddleware');

router.get('/profile', authorize('scientist'), (req, res) => {
  res.json({ message: 'Scientist profile page' });
});

module.exports = router;
