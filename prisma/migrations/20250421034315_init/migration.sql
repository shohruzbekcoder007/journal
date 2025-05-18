/*
  Warnings:

  - You are about to alter the column `title` on the `Articles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropIndex
DROP INDEX "Articles_fileId_key";

-- AlterTable
ALTER TABLE "Articles" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);
