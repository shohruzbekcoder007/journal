/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `Journal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "fileId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Journal_fileId_key" ON "Journal"("fileId");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
