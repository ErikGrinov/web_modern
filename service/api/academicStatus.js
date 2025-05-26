const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/api/academic-status', async (req, res) => {
    try {
        const statuses = await prisma.academic_status.findMany();
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch academic status' });
    }
});

module.exports = router;
