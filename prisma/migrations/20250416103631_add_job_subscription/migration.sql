-- CreateTable
CREATE TABLE "JobSubscription" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jobTag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobSubscription_email_jobTag_key" ON "JobSubscription"("email", "jobTag");
