const express = require('express');
const directionsRouter = require('./api/directions');
const statusRouter = require('./api/academicStatus');
const degreeRouter = require('./api/scientificDegree');
const registerRouter = require('./api/register');
const registerScientistRouter = require('./api/registerScientist'); 
const authRoutes = require('./routes/authRoutes'); // Переконайтеся, що шлях правильний
const protectedRoute = require('./routes/protectedRoute');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const createVacancy = require('./api/createVacancy');
const vacancies = require('./api/vacancies');
const vacanciesRoutes = require('./api/deleteVacancy');
const checkResume = require('./routes/checkResume')
const directionScientist = require('./api/directionScientist');
const getAuthorizedScientistDirection = require('./routes/direction');
const multer = require('multer');
const downloadResume = require('./routes/download');
const deleteResume = require('./routes/deleteResume')
const scientistRoutes = require('./routes/scientist');
const getnotificationRoutes = require('./routes/notificationRoutes');


const app = express();
const port = 8000;

const prisma = new PrismaClient();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Дозволити всім доменам
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Налаштуйте multer для збереження завантажених файлів у папці 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Обробник завантаження файлів
app.post('/upload', upload.single('file'), async (req, res) => {
  // Інформація про завантажений файл знаходиться у req.file
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  try {
    // Отримати email користувача, який завантажив файл
    const userEmail = req.body.email;

    // Створити новий запис у таблиці Resumes
    await prisma.resume.create({
      data: {
        scientist_email: userEmail,
        Data_creation: new Date(),
        template_resume: req.file.filename // Зберігаємо ім'я файлу в базі даних
      }
    });

    res.send('File uploaded successfully and saved to database');
  } catch (error) {
    console.error('Failed to save resume to database', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use(express.json());

app.use(cors());

app.use(directionsRouter);
app.use(statusRouter);
app.use( degreeRouter);
app.use(registerRouter);
app.use(registerScientistRouter);
app.use('/authRoutes', authRoutes); // Правильне додавання маршрутів
app.use('/protected', protectedRoute);
app.use(createVacancy);
app.use(vacancies);
app.use(vacanciesRoutes);
app.use(directionScientist)
app.use('/api', getAuthorizedScientistDirection);
app.use('/api', checkResume);
app.use('/api', downloadResume);
app.use('/api', deleteResume);
app.use('/api', scientistRoutes);
app.use('/api', getnotificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
