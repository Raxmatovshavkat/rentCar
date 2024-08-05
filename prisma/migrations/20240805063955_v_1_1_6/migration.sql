-- AlterTable
ALTER TABLE "User" ADD COLUMN     "carFindexId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_carFindexId_fkey" FOREIGN KEY ("carFindexId") REFERENCES "CarFindex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
