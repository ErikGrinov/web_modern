const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Маршрут для перевірки існування резюме для конкретного користувача
router.get('/checkResume/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail; // Параметр, що передається в URL запиту
    const resume = await prisma.resume.findUnique({
      where: {
        scientist_email: userEmail,
      },
    });
    if (resume) {
      // Якщо резюме існує для користувача, повертаємо успішну відповідь з резюме
      return res.status(200).json({ exists: true, resume });
    } else {
      // Якщо резюме не знайдено, повертаємо відповідь, що резюме не існує
      return res.status(404).json({ exists: false, message: "Resume not found" });
    }
  } catch (error) {
    console.error("Error checking resume existence:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
