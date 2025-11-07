-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "start_date" TIMESTAMP(3),
    "cafe_id" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT,
    "location" TEXT NOT NULL,

    CONSTRAINT "cafes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_id_key" ON "employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_address_key" ON "employees"("email_address");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
