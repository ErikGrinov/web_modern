const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

// Ендпоінт для отримання вакансій з бази даних
router.get('/api/vacancies', async (req, res) => {
    try {
      const vacancies = await prisma.staff_list.findMany({
        select: {
          Name_position: true,
          Directions: {
            select: {
              Direction: {
                select: {
                  Name_direction: true
                }
              }
            }
          },
          Amount: true,
          Firm: {
            select: {
              Firm_Name: true,
              EDRPOU: true
            }
          },
          ID_position: true
        }
      });
      res.json(vacancies);
    } catch (error) {
      console.error('Failed to fetch vacancies', error);
      res.status(500).send('Failed to fetch vacancies');
    }
  });
  



module.exports = router;
