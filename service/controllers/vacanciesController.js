const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.deleteVacancy = async (req, res) => {
  const vacancyId = req.params.id;
  const userEDRPOU = req.headers.edrpou;

  try {
    // Знайдіть вакансію за ID та перевірте, чи належить вона фірмі з вказаним ЄДРПОУ
    const vacancy = await prisma.staff_list.findUnique({
      where: { ID_position: vacancyId },
      include: { Firm: true }
    });

    if (!vacancy || vacancy.Firm.EDRPOU !== userEDRPOU) {
      return res.status(404).json({ error: 'Vacancy not found or you do not have permission to delete it.' });
    }

    // Видалення запису з таблиці Direction_position за полем ID_position
    await prisma.direction_position.deleteMany({
      where: { ID_position: vacancyId }
    });

    // Видалення вакансії з таблиці Staff_list
    await prisma.staff_list.delete({
      where: { ID_position: vacancyId }
    });

    res.status(200).json({ message: 'Vacancy successfully deleted.' });
  } catch (error) {
    console.error('Failed to delete vacancy:', error);
    res.status(500).json({ error: 'An error occurred while trying to delete the vacancy.' });
  }
};
