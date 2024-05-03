import { Birthday, Eventee, Greeting, PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './user';

const prisma = new PrismaClient();
const supabase = createClient();

export async function findManyEvents() {
  const user = await getCurrentUser();

  const events = await prisma.event.findMany({
    where: {
      userId: user.id,
    },
    include: {
      eventee: true,
    },
  });

  return events;
}

export async function createEvent({
  title,
  startedAt,
  type,
  eventee,
  birthday,
  greeting,
}: {
  title: string;
  startedAt: Date;
  type: 'BIRTHDAY' | 'GREETING';
  eventee: Eventee;
  birthday?: Birthday;
  greeting?: Greeting;
}) {
  const user = await getCurrentUser();

  const event = await prisma.event.create({
    data: {
      title,
      startedAt,
      type,
      eventee: {
        connect: {
          id: eventee.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return event;
}
