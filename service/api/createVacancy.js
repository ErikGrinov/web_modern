const { v4: uuidv4 } = require('uuid');

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.post('/api/createVacancy', async (req, res) => {
  try {
   
    const { nameVac, amount, directionId } = req.body;

   
    const EDRPOU = req.headers.edrpou;

   
    if (!EDRPOU) {
      return res.status(400).json({ message: 'EDRPOU is not provided' });
    }

    
    const newVacancy = await prisma.staff_list.create({
      data: {
        ID_position: uuidv4(), 
        EDRPOU: EDRPOU,
        Name_position: nameVac, 
        Amount: amount, 
      }
    });

    
    const newDirectionPosition = await prisma.direction_position.create({
      data: {
        ID_position: newVacancy.ID_position,
        EDRPOU: EDRPOU, 
        ID_direction: directionId, 
      }
    });


    return res.status(201).json({ message: 'Vacancy created successfully', vacancy: newVacancy });
  } catch (error) {
    console.error('Failed to create vacancy', error);

    return res.status(500).json({ message: 'Failed to create vacancy' });
  }
});

module.exports = router;
