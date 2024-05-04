/*
  Warnings:

  - Added the required column `phoneNumber` to the `Eventee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Eventee" ADD COLUMN     "phoneNumber" TEXT NOT NULL;
