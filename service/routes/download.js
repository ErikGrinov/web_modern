const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ендпоінт для завантаження файлу
router.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, '../uploads', fileName); // Шлях до завантажених файлів
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('open', function () {
    res.set('Content-Type', 'application/octet-stream');
    fileStream.pipe(res);
  });

  fileStream.on('error', function () {
    res.status(404).send('File not found');
  });
});

module.exports = router;
