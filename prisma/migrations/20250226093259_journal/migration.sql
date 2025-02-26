/*
  Warnings:

  - You are about to drop the column `cretaedAt` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "cretaedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Journal" (
    "title" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "issn" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'active',
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);
