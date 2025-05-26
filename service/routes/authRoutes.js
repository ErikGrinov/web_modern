const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const scientistRoutes = require('./scientistRoutes');
const firmRoutes = require('./firmRoutes');

// Додамо маршрути для науковців та фірм
router.use('/scientists', scientistRoutes);
router.use('/firms', firmRoutes);

// Авторизація науковця
router.post('/scientist', async (req, res) => {
    const { email, password } = req.body;
    try {
        const scientist = await prisma.scientist.findUnique({
            where: { scientist_email: email }
        });
        if (!scientist) {
            return res.status(404).json({ error: 'Scientist not found' });
        }
        const passwordMatch = await bcrypt.compare(password, scientist.scientist_password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: scientist.scientist_email, role: 'scientist' }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ id: scientist.scientist_email, token }); // Додали передачу id у відповіді
    } catch (error) {
        console.error('Scientist login error:', error);
        res.status(500).json({ error: 'Scientist login failed' });
    }
});

// Авторизація фірми
router.post('/firm', async (req, res) => {
    const { edrpou, password } = req.body;
    try {
        const firm = await prisma.firm.findUnique({
            where: { EDRPOU: edrpou }
        });
        if (!firm) {
            return res.status(404).json({ error: 'Firm not found' });
        }
        const passwordMatch = await bcrypt.compare(password, firm.Firm_Password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: firm.EDRPOU, role: 'firm' }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ id: firm.EDRPOU, token }); // Додали передачу id у відповіді
    } catch (error) {
        console.error('Firm login error:', error);
        res.status(500).json({ error: 'Firm login failed' });
    }
});

module.exports = router;
