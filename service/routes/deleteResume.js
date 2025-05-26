const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// DELETE endpoint для видалення резюме
router.delete('/deleteResume/:scientistEmail', async (req, res) => {
  const scientistEmail = req.params.scientistEmail;

  try {
    // Отримати резюме за електронною поштою науковця
    const resume = await prisma.resume.findUnique({
      where: {
        scientist_email: scientistEmail
      }
    });

    // Перевірити, чи існує резюме
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Видалити резюме з бази даних
    await prisma.resume.deleteMany({
      where: {
        scientist_email: scientistEmail
      }
    });

    // Відправити відповідь про успішне видалення резюме
    return res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Failed to delete resume', error);
    return res.status(500).json({ message: 'Failed to delete resume' });
  }
});

module.exports = router;
