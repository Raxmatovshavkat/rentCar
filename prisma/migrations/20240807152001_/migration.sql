/*
  Warnings:

  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- DropTable
DROP TABLE "Avatar";

-- CreateTable
CREATE TABLE "UserAvatar" (
    "id" SERIAL NOT NULL,
    "avatar_url" TEXT NOT NULL,

    CONSTRAINT "UserAvatar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "UserAvatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
