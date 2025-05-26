// authRouter.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

router.post('/api/register', async (req, res) => {
    const { EDRPOU, Firm_Name, Adress, Firm_Password, Firm_email, Firm_Phone } = req.body;

    // Перевірка, чи всі обов'язкові поля заповнені
    if (!EDRPOU || !Firm_Password || !Firm_email || !Firm_Phone) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Перевірка, чи такий користувач вже існує
    const existingFirm = await prisma.firm.findUnique({
        where: { EDRPOU }
    });

    if (existingFirm) {
        return res.status(400).json({ error: 'Firm with this EDRPOU already exists' });
    }

    // Хешування паролю
    const hashedPassword = await bcrypt.hash(Firm_Password, 8);

    // Створення нової фірми в базі даних
    const newFirm = await prisma.firm.create({
        data: {
            EDRPOU,
            Firm_Name,
            Adress,
            Firm_Password: hashedPassword,
            Firm_email,
            Firm_Phone
        }
    });

    res.status(201).json(newFirm);
});

module.exports = router;
