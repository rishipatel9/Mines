/*
  Warnings:

  - Changed the type of `bet` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `multiplier` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `payout` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "bet",
ADD COLUMN     "bet" INTEGER NOT NULL,
DROP COLUMN "multiplier",
ADD COLUMN     "multiplier" INTEGER NOT NULL,
DROP COLUMN "payout",
ADD COLUMN     "payout" INTEGER NOT NULL;
