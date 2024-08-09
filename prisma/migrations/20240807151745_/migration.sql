/*
  Warnings:

  - You are about to drop the `UserAvatar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarId" DROP NOT NULL;

-- DropTable
DROP TABLE "UserAvatar";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Avatar" (
    "id" SERIAL NOT NULL,
    "avatar_url" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
