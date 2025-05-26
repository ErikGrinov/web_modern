-- CreateTable
CREATE TABLE "Firm" (
    "EDRPOU" VARCHAR(8) NOT NULL,
    "Firm_Name" VARCHAR(55),
    "Adress" VARCHAR(255),
    "Firm_Password" VARCHAR(255),
    "Firm_email" VARCHAR(55),
    "Firm_Phone" CHAR(13),

    CONSTRAINT "Firm_pkey" PRIMARY KEY ("EDRPOU")
);

-- CreateTable
CREATE TABLE "Staff_list" (
    "ID_position" VARCHAR(255) NOT NULL,
    "EDRPOU" TEXT NOT NULL,
    "Name_position" VARCHAR(55),
    "Amount" INTEGER,

    CONSTRAINT "Staff_list_pkey" PRIMARY KEY ("ID_position")
);

-- CreateTable
CREATE TABLE "Direction" (
    "ID_direction" VARCHAR(255) NOT NULL,
    "Name_direction" VARCHAR(122),

    CONSTRAINT "Direction_pkey" PRIMARY KEY ("ID_direction")
);

-- CreateTable
CREATE TABLE "Direction_position" (
    "ID_position" TEXT NOT NULL,
    "EDRPOU" TEXT NOT NULL,
    "ID_direction" TEXT NOT NULL,

    CONSTRAINT "Direction_position_pkey" PRIMARY KEY ("ID_position","EDRPOU","ID_direction")
);

-- CreateTable
CREATE TABLE "scientific_degree" (
    "ID_degree" VARCHAR(22) NOT NULL,
    "Name_degree" VARCHAR(55),

    CONSTRAINT "scientific_degree_pkey" PRIMARY KEY ("ID_degree")
);

-- CreateTable
CREATE TABLE "academic_status" (
    "ID_status" VARCHAR(5) NOT NULL,
    "Name_status" VARCHAR(55),

    CONSTRAINT "academic_status_pkey" PRIMARY KEY ("ID_status")
);

-- CreateTable
CREATE TABLE "scientist" (
    "scientist_email" VARCHAR(55) NOT NULL,
    "ID_status" TEXT,
    "ID_degree" TEXT,
    "First_name" VARCHAR(55),
    "Middle_name" VARCHAR(55),
    "Second_name" VARCHAR(55),
    "Date_birth" TIMESTAMP(3),
    "scientist_phone" VARCHAR(22),
    "scientist_password" VARCHAR(255),

    CONSTRAINT "scientist_pkey" PRIMARY KEY ("scientist_email")
);

-- CreateTable
CREATE TABLE "Direction_scientist" (
    "scientist_email" TEXT NOT NULL,
    "ID_direction" TEXT NOT NULL,

    CONSTRAINT "Direction_scientist_pkey" PRIMARY KEY ("scientist_email","ID_direction")
);

-- CreateTable
CREATE TABLE "Resume" (
    "scientist_email" VARCHAR(55) NOT NULL,
    "Data_creation" TIMESTAMPTZ NOT NULL,
    "template_resume" TEXT,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("scientist_email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Firm_EDRPOU_key" ON "Firm"("EDRPOU");

-- CreateIndex
CREATE UNIQUE INDEX "Direction_ID_direction_key" ON "Direction"("ID_direction");

-- CreateIndex
CREATE UNIQUE INDEX "scientific_degree_ID_degree_key" ON "scientific_degree"("ID_degree");

-- CreateIndex
CREATE UNIQUE INDEX "academic_status_ID_status_key" ON "academic_status"("ID_status");

-- CreateIndex
CREATE UNIQUE INDEX "scientist_scientist_email_key" ON "scientist"("scientist_email");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_scientist_email_key" ON "Resume"("scientist_email");

-- AddForeignKey
ALTER TABLE "Staff_list" ADD CONSTRAINT "Staff_list_EDRPOU_fkey" FOREIGN KEY ("EDRPOU") REFERENCES "Firm"("EDRPOU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction_position" ADD CONSTRAINT "Direction_position_ID_position_fkey" FOREIGN KEY ("ID_position") REFERENCES "Staff_list"("ID_position") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction_position" ADD CONSTRAINT "Direction_position_ID_direction_fkey" FOREIGN KEY ("ID_direction") REFERENCES "Direction"("ID_direction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scientist" ADD CONSTRAINT "scientist_ID_status_fkey" FOREIGN KEY ("ID_status") REFERENCES "academic_status"("ID_status") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scientist" ADD CONSTRAINT "scientist_ID_degree_fkey" FOREIGN KEY ("ID_degree") REFERENCES "scientific_degree"("ID_degree") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction_scientist" ADD CONSTRAINT "Direction_scientist_scientist_email_fkey" FOREIGN KEY ("scientist_email") REFERENCES "scientist"("scientist_email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction_scientist" ADD CONSTRAINT "Direction_scientist_ID_direction_fkey" FOREIGN KEY ("ID_direction") REFERENCES "Direction"("ID_direction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_scientist_email_fkey" FOREIGN KEY ("scientist_email") REFERENCES "scientist"("scientist_email") ON DELETE RESTRICT ON UPDATE CASCADE;
