-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_photoId_fkey";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "photoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
