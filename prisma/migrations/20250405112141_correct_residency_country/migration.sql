/*
  Warnings:

  - You are about to drop the column `residentcyCountry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "residentcyCountry",
ADD COLUMN     "residencyCountry" TEXT;
