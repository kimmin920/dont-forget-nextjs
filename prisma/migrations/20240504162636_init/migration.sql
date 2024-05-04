/*
  Warnings:

  - Added the required column `birthday` to the `Eventee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Eventee" ADD COLUMN     "birthday" DATE NOT NULL,
ALTER COLUMN "phoneNumber" SET DEFAULT '';
