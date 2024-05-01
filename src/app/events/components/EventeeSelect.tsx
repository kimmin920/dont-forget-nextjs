'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function EventeeSelect() {
  const eventees = await prisma.eventee.findMany();

  return (
    <>
      {eventees.map((eventee) => (
        <div key={eventee.id}>{eventee.name}</div>
      ))}
    </>
  );
}
