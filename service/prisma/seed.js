const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Заповнення таблиці Direction
  const directions = [
    { ID_direction: '011', Name_direction: 'Educational Sciences' },
    { ID_direction: '012', Name_direction: 'Preschool Education' },
    { ID_direction: '013', Name_direction: 'Primary Education' },
    { ID_direction: '014', Name_direction: 'Secondary Education (by subject specializations)' },
    { ID_direction: '015', Name_direction: 'Vocational Education (by specializations)' },
    { ID_direction: '016', Name_direction: 'Special Education' },
    { ID_direction: '017', Name_direction: 'Physical Culture and Sports' },
    { ID_direction: '021', Name_direction: 'Audiovisual Art and Production' },
    { ID_direction: '022', Name_direction: 'Design' },
    { ID_direction: '023', Name_direction: 'Fine Arts, Decorative Arts, Restoration' },
    { ID_direction: '024', Name_direction: 'Choreography' },
    { ID_direction: '025', Name_direction: 'Music Art' },
    { ID_direction: '026', Name_direction: 'Performing Arts' },
    { ID_direction: '027', Name_direction: 'Museology, Monument Studies' },
    { ID_direction: '028', Name_direction: 'Management of Socio-Cultural Activities' },
    { ID_direction: '029', Name_direction: 'Information, Library, and Archival Science' },
    { ID_direction: '031', Name_direction: 'Religious Studies' },
    { ID_direction: '032', Name_direction: 'History and Archaeology' },
    { ID_direction: '033', Name_direction: 'Philosophy' },
    { ID_direction: '034', Name_direction: 'Cultural Studies' },
    { ID_direction: '035', Name_direction: 'Philology' },
    { ID_direction: '041', Name_direction: 'Theology' },
    { ID_direction: '051', Name_direction: 'Economics' },
    { ID_direction: '052', Name_direction: 'Political Science' },
    { ID_direction: '053', Name_direction: 'Psychology' },
    { ID_direction: '054', Name_direction: 'Sociology' },
    { ID_direction: '055', Name_direction: 'International Relations, Public Communications, and Regional Studies' },
    { ID_direction: '056', Name_direction: 'International Economic Relations' },
    { ID_direction: '061', Name_direction: 'Journalism' },
    { ID_direction: '071', Name_direction: 'Accounting and Taxation' },
    { ID_direction: '072', Name_direction: 'Finance, Banking, and Insurance' },
    { ID_direction: '073', Name_direction: 'Management' },
    { ID_direction: '074', Name_direction: 'Public Administration' },
    { ID_direction: '075', Name_direction: 'Marketing' },
    { ID_direction: '076', Name_direction: 'Entrepreneurship, Trade, and Exchange Activities' },
    { ID_direction: '081', Name_direction: 'Law' },
    { ID_direction: '082', Name_direction: 'International Law' },
    { ID_direction: '091', Name_direction: 'Biology' },
    { ID_direction: '101', Name_direction: 'Ecology' },
    { ID_direction: '102', Name_direction: 'Chemistry' },
    { ID_direction: '103', Name_direction: 'Earth Sciences' },
    { ID_direction: '104', Name_direction: 'Physics and Astronomy' },
    { ID_direction: '105', Name_direction: 'Applied Physics and Nanomaterials' },
    { ID_direction: '111', Name_direction: 'Mathematics' },
    { ID_direction: '112', Name_direction: 'Statistics' },
    { ID_direction: '113', Name_direction: 'Applied Mathematics' },
    { ID_direction: '121', Name_direction: 'Software Engineering' },
    { ID_direction: '122', Name_direction: 'Computer Science and Information Technology' },
    { ID_direction: '123', Name_direction: 'Computer Engineering' },
    { ID_direction: '124', Name_direction: 'Systems Analysis' },
    { ID_direction: '125', Name_direction: 'Cybersecurity' },
    { ID_direction: '131', Name_direction: 'Applied Mechanics' },
    { ID_direction: '132', Name_direction: 'Materials Science' },
    { ID_direction: '133', Name_direction: 'Industrial Engineering' },
    { ID_direction: '134', Name_direction: 'Aerospace Engineering' },
    { ID_direction: '135', Name_direction: 'Shipbuilding' },
    { ID_direction: '136', Name_direction: 'Metallurgy' },
    { ID_direction: '141', Name_direction: 'Electrical Power Engineering, Electrical Engineering, and Electromechanics' },
    { ID_direction: '142', Name_direction: 'Power Engineering' },
    { ID_direction: '143', Name_direction: 'Nuclear Power Engineering' },
    { ID_direction: '144', Name_direction: 'Thermal Power Engineering' },
    { ID_direction: '145', Name_direction: 'Hydropower Engineering' },
    { ID_direction: '151', Name_direction: 'Automation and Computer-Integrated Technologies' },
    { ID_direction: '152', Name_direction: 'Metrology and Information-Measuring Technology' },
    { ID_direction: '153', Name_direction: 'Micro- and Nanosystems Engineering' },
    { ID_direction: '161', Name_direction: 'Chemical Technologies and Engineering' },
    { ID_direction: '162', Name_direction: 'Biotechnology and Bioengineering' },
    { ID_direction: '163', Name_direction: 'Biomedical Engineering' },
    { ID_direction: '171', Name_direction: 'Electronics' },
    { ID_direction: '172', Name_direction: 'Telecommunications and Radio Engineering' },
    { ID_direction: '173', Name_direction: 'Avionics' },
    { ID_direction: '181', Name_direction: 'Food Technologies' },
    { ID_direction: '182', Name_direction: 'Light Industry Technologies' },
    { ID_direction: '183', Name_direction: 'Environmental Protection Technologies' },
    { ID_direction: '184', Name_direction: 'Mining' },
    { ID_direction: '185', Name_direction: 'Oil and Gas Engineering and Technologies' },
    { ID_direction: '186', Name_direction: 'Publishing and Printing' },
    { ID_direction: '191', Name_direction: 'Architecture and Urban Planning' },
    { ID_direction: '192', Name_direction: 'Construction and Civil Engineering' },
    { ID_direction: '193', Name_direction: 'Geodesy and Land Management' },
    { ID_direction: '201', Name_direction: 'Agronomy' },
    { ID_direction: '202', Name_direction: 'Plant Protection and Quarantine' },
    { ID_direction: '203', Name_direction: 'Horticulture and Viticulture' },
    { ID_direction: '204', Name_direction: 'Technology of Production and Processing of Livestock Products' }, 
    { ID_direction: '205', Name_direction: 'Forestry' },
    { ID_direction: '206', Name_direction: 'Landscape Architecture' },
    { ID_direction: '207', Name_direction: 'Water Bioresources and Aquaculture' },
    { ID_direction: '208', Name_direction: 'Agroengineering' },
    { ID_direction: '211', Name_direction: 'Veterinary Medicine' },
    { ID_direction: '212', Name_direction: 'Veterinary Hygiene, Sanitation, and Expertise' },
    { ID_direction: '221', Name_direction: 'Dentistry' },
    { ID_direction: '222', Name_direction: 'Medicine' },
    { ID_direction: '223', Name_direction: 'Nursing' },
    { ID_direction: '224', Name_direction: 'Medical Diagnostics and Treatment Technologies' },
    { ID_direction: '225', Name_direction: 'Medical and Psychological Rehabilitation' },
    { ID_direction: '226', Name_direction: 'Pharmacy' },
    { ID_direction: '227', Name_direction: 'Physical Rehabilitation' },
    { ID_direction: '231', Name_direction: 'Social Work' },
    { ID_direction: '232', Name_direction: 'Social Security' },
    { ID_direction: '241', Name_direction: 'Hotel and Restaurant Business' },
    { ID_direction: '242', Name_direction: 'Tourism' },
    { ID_direction: '251', Name_direction: 'State Security' },
    { ID_direction: '252', Name_direction: 'State Border Security' },
    { ID_direction: '253', Name_direction: 'Military Management (by armed forces)' },
    { ID_direction: '254', Name_direction: 'Troop Support' },
    { ID_direction: '255', Name_direction: 'Weapons and Military Equipment' },
    { ID_direction: '261', Name_direction: 'Fire Safety' },
    { ID_direction: '262', Name_direction: 'Law Enforcement Activities' },
    { ID_direction: '263', Name_direction: 'Civil Safety' },
    { ID_direction: '271', Name_direction: 'River and Sea Transport' },
    { ID_direction: '272', Name_direction: 'Aviation Transport' },
    { ID_direction: '273', Name_direction: 'Railway Transport' },
    { ID_direction: '274', Name_direction: 'Automobile Transport' },
    { ID_direction: '275', Name_direction: 'Transport Technologies (by types)' }
];


  for (const direction of directions) {
    await prisma.direction.upsert({
      where: { ID_direction: direction.ID_direction },
      update: {},
      create: direction,
    });
  }

  // Заповнення таблиці Academic_status
  const academicStatuses = [
    { ID_status: '1', Name_status: 'Associate Professor' },
    { ID_status: '2', Name_status: 'Senior Researcher' },
    { ID_status: '3', Name_status: 'Professor' }
  ];

  for (const status of academicStatuses) {
    await prisma.academic_status.upsert({
      where: { ID_status: status.ID_status },
      update: {},
      create: status,
    });
  }

  // Заповнення таблиці Scientific_degree
  const scientificDegrees = [
    { ID_degree: '1', Name_degree: 'Candidate of Sciences' },
    { ID_degree: '2', Name_degree: 'Doctor of Sciences' }
  ];

  for (const degree of scientificDegrees) {
    await prisma.scientific_degree.upsert({
      where: { ID_degree: degree.ID_degree },
      update: {},
      create: degree,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
