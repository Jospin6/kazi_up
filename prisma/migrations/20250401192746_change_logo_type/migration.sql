/*
  Warnings:

  - The `logo` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "logo",
ADD COLUMN     "logo" BYTEA;
