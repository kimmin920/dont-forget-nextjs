-- CreateEnum
CREATE TYPE "Repetition" AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "CalendarType" AS ENUM ('LUNAR', 'SOLAR');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('BIRTHDAY', 'GREETING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventeeId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "preferences" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Birthday" (
    "eventId" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "calendarType" "CalendarType" NOT NULL,

    CONSTRAINT "Birthday_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Greeting" (
    "eventId" TEXT NOT NULL,
    "repetition" "Repetition" NOT NULL,

    CONSTRAINT "Greeting_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Eventee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Eventee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventeeId_fkey" FOREIGN KEY ("eventeeId") REFERENCES "Eventee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Birthday" ADD CONSTRAINT "Birthday_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Greeting" ADD CONSTRAINT "Greeting_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
