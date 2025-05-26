const express = require('express');
const router = express.Router();
const vacanciesController = require('../controllers/vacanciesController');


router.delete('/api/deleteVacancy/:id', vacanciesController.deleteVacancy);

module.exports = router;