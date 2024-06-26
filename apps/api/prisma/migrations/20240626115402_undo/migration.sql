/*
  Warnings:

  - Changed the type of `userId` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
