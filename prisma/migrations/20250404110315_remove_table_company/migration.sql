/*
  Warnings:

  - You are about to drop the column `companyId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `employement_TypeId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `job_categoryId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `postedById` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `accountType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `residencyCountry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `year_end` on the `UserActivity` table. All the data in the column will be lost.
  - You are about to drop the column `year_start` on the `UserActivity` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employement_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyName` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryTag` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_employement_TypeId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_job_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_postedById_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "companyId",
DROP COLUMN "employement_TypeId",
DROP COLUMN "job_categoryId",
DROP COLUMN "keywords",
DROP COLUMN "location",
DROP COLUMN "postedById",
DROP COLUMN "salary",
DROP COLUMN "title",
ADD COLUMN     "companyLogo" BYTEA,
ADD COLUMN     "companyName" VARCHAR(255) NOT NULL,
ADD COLUMN     "employementTypeId" TEXT,
ADD COLUMN     "howToApply" TEXT,
ADD COLUMN     "jobCategoryId" TEXT,
ADD COLUMN     "jobRestricted" VARCHAR(255),
ADD COLUMN     "position" VARCHAR(255) NOT NULL,
ADD COLUMN     "primaryTag" VARCHAR(255) NOT NULL,
ADD COLUMN     "salaryRange" VARCHAR(255),
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "website" VARCHAR(500),
ALTER COLUMN "remote" DROP DEFAULT,
ALTER COLUMN "remote" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tags" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountType",
DROP COLUMN "residencyCountry",
ADD COLUMN     "residentcyCountry" TEXT;

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "year_end",
DROP COLUMN "year_start",
ADD COLUMN     "yearEnd" TEXT,
ADD COLUMN     "yearStart" TEXT;

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Employement_Type";

-- DropTable
DROP TABLE "Job_category";

-- DropEnum
DROP TYPE "AccountType";

-- CreateTable
CREATE TABLE "JobCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployementType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "EmployementType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobCategoryId_fkey" FOREIGN KEY ("jobCategoryId") REFERENCES "JobCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_employementTypeId_fkey" FOREIGN KEY ("employementTypeId") REFERENCES "EmployementType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
