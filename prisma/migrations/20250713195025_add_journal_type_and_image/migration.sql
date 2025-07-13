-- CreateEnum
CREATE TYPE "JournalType" AS ENUM ('Scientific', 'Amaliy', 'Ommabop');

-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "type" "JournalType" NOT NULL DEFAULT 'Scientific';

-- CreateTable
CREATE TABLE "AcceptedArticle" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'pending',
    "fileId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "keyword" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "AcceptedArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcceptedArticle_fileId_key" ON "AcceptedArticle"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "AcceptedArticle_author_key" ON "AcceptedArticle"("author");

-- AddForeignKey
ALTER TABLE "AcceptedArticle" ADD CONSTRAINT "AcceptedArticle_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
