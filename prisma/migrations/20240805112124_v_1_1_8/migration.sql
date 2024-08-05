-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_userId_fkey";

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "rentalId" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "status" SET DEFAULT 'Pending';

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rentals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
