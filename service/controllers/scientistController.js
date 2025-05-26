// server/controllers/scientistController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getScientistByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const scientist = await prisma.scientist.findUnique({
            where: { scientist_email: email },
            select: {
                First_name: true,
                Middle_name: true,
                Second_name: true,
                scientist_email: true,
                Resumes: {
                    select: {
                        template_resume: true
                    }
                },
                Directions: {
                    select: {
                        Direction: {
                            select: {
                                Name_direction: true
                            }
                        }
                    }
                }
            }
        });

        if (!scientist) {
            return res.status(404).json({ message: 'Scientist not found' });
        }

        res.status(200).json(scientist);
    } catch (error) {
        console.error('Error fetching scientist data:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getScientistByEmail
};
