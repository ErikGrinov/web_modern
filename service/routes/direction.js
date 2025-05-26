const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Ендпоінт для отримання напрямку авторизованого науковця
router.get('/getAuthorizedScientistDirection/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const scientist = await prisma.scientist.findUnique({
      where: { scientist_email: email },
      include: { Directions: { include: { Direction: true } } }
    });

    // Перевіряємо, чи науковець і його напрямок існують
    if (scientist && scientist.Directions.length > 0) {
      const direction = scientist.Directions[0].Direction.Name_direction;
      return res.json({ direction });
    } else {
      return res.status(404).json({ message: 'Напрямок авторизованого науковця не знайдено' });
    }
  } catch (error) {
    console.error('Помилка при отриманні напрямку авторизованого науковця', error);
    return res.status(500).json({ message: 'Помилка при отриманні напрямку авторизованого науковця' });
  }
});

module.exports = router;
