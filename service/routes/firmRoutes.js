// firmRoutes.js
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authMiddleware');

router.get('/createvacancies', authorize('firm'), (req, res) => {
  res.json({ message: 'Firm create vacancies page' });
});

module.exports = router;
