/*
  Warnings:

  - Added the required column `userId` to the `Eventee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Eventee" ADD COLUMN     "userId" TEXT NOT NULL;
