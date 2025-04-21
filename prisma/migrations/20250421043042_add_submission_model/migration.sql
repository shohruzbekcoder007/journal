-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "authors" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "keywords" VARCHAR(255) NOT NULL,
    "fileId" INTEGER,
    "comments" TEXT,
    "status" "status" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_fileId_key" ON "Submission"("fileId");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
