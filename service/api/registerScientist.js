const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient(); // Створюємо екземпляр PrismaClient

router.post('/api/registerScientist', async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        email,
        dateOfBirth,
        mobileNumber,
        password,
        ID_status,
        ID_degree
    } = req.body;

    // Перевірка, чи всі обов'язкові поля заповнені
    if (!firstName || !lastName || !email || !dateOfBirth || !mobileNumber || !password || !ID_status || !ID_degree) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        // Хешуємо пароль
        const hashedPassword = await bcrypt.hash(password, 8);

        const existingScientist = await prisma.scientist.findUnique({
            where: { scientist_email: email }
        });
    
        if (existingScientist) {
            return res.status(400).json({ error: 'Scientist with this email already exists' });
        }

        // Перетворення dateOfBirth на об'єкт типу Date
        const birthDate = new Date(dateOfBirth);

        // Створення нового вченого в базі даних
        const newScientist = await prisma.scientist.create({
            data: {
                scientist_email: email,
                ID_status,
                ID_degree,
                First_name: firstName,
                Middle_name: middleName,
                Second_name: lastName,
                Date_birth: birthDate,
                scientist_phone: mobileNumber,
                scientist_password: hashedPassword
            }
        });

        res.status(201).json(newScientist);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

module.exports = router;
