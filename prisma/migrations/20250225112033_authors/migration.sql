/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `File` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('active', 'inactive', 'pending');

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Author" (
    "photoId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "researchField" TEXT NOT NULL,
    "publicationsCount" INTEGER NOT NULL,
    "orcidId" TEXT,
    "status" "status" NOT NULL DEFAULT 'active',
    "biography" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_photoId_key" ON "Author"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
