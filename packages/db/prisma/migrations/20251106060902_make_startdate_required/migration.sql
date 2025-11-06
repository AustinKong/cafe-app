/*
  Warnings:

  - Made the column `start_date` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "start_date" SET NOT NULL;
