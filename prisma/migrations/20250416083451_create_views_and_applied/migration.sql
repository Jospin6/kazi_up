-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL,
    "jobId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applied" (
    "id" TEXT NOT NULL,
    "jobId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Applied_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applied" ADD CONSTRAINT "Applied_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applied" ADD CONSTRAINT "Applied_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
