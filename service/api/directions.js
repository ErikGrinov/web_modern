const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/api/directions', async (req, res) => {
  try {
    const directions = await prisma.direction.findMany();
    const formattedDirections = directions.map(direction => ({
      code: direction.ID_direction,
      name: direction.Name_direction
    }));
    res.json(formattedDirections);
  } catch (error) {
    console.error('Failed to fetch directions:', error);
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

module.exports = router;
