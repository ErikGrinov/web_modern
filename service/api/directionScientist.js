const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Збереження нового напрямку для користувача
router.post('/api/directionScientist', async (req, res) => {
  try {
    const { scientist_email, ID_direction } = req.body;

    // Перевірка наявності scientist_email та ID_direction у тілі запиту
    if (!scientist_email || !ID_direction) {
      return res.status(400).json({ message: 'scientist_email or ID_direction is not provided' });
    }

    const directionScientist = await prisma.Direction_scientist.upsert({
      where: {  scientist_email_ID_direction:{ scientist_email, ID_direction }},
      update: { ID_direction },
      create: { scientist_email, ID_direction }
    });
    res.json(directionScientist);
  } catch (error) {
    console.error('Failed to save direction data', error);
    res.status(500).send('Помилка при збереженні даних напрямку');
  }
});

module.exports = router;
