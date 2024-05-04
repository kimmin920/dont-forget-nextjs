import { Birthday, Eventee, Greeting, PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './user';

const prisma = new PrismaClient();

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

export async function findOneEvent(id: string) {
  const user = await getCurrentUser();

  const event = await prisma.event.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
    include: {
      eventee: true,
    },
  });

  if (!event) {
    redirect('404');
  }

  return event;
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
