// server/routes/scientist.js
const express = require('express');
const { getScientistByEmail } = require('../controllers/scientistController');

const router = express.Router();

router.get('/scientist/:email', getScientistByEmail);

module.exports = router;
