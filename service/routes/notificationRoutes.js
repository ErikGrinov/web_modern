const express = require('express');
const router = express.Router();
const cache = require('memory-cache');

// Ендпоінт для прийому даних з форми відправки повідомлення
router.post('/sendNotification', (req, res) => {
    try {
        // Отримання даних з запиту
        const { fullName, email, researchField, message, resume } = req.body;

        // Збереження даних у змінній пам'яті
        cache.put('notificationData', { fullName, email, researchField, message, resume });

        // Повернення успішного статусу та повідомлення
        res.status(200).json({ success: true, message: 'Notification data saved successfully.' });
    } catch (error) {
        // Обробка помилок
        console.error('Error saving notification data:', error);
        res.status(500).json({ success: false, message: 'Failed to save notification data.' });
    }
});


// Ендпоінт для отримання збережених даних
router.get('/getNotificationData', (req, res) => {
    try {
        // Отримання збережених даних з змінної пам'яті
        const notificationData = cache.get('notificationData');

        // Повернення даних
        res.status(200).json({ success: true, data: notificationData });
    } catch (error) {
        // Обробка помилок
        console.error('Error getting notification data:', error);
        res.status(500).json({ success: false, message: 'Failed to get notification data.' });
    }
});

module.exports = router;
