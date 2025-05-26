const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/api/scientific-degree', async (req, res) => {
    try {
        const degrees = await prisma.scientific_degree.findMany();
        res.json(degrees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch scientific degrees' });
    }
});

module.exports = router;
