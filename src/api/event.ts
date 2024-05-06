import {
  Birthday,
  EventType,
  Eventee,
  Greeting,
  PrismaClient,
} from '@prisma/client';
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

export async function createBirthdayEvent({
  title,
  startedAt,
  type,
  eventeeId,
  birthday,
}: {
  title: string;
  startedAt: Date;
  type: 'BIRTHDAY';
  eventeeId: Eventee['id'];
  birthday: Omit<Birthday, 'eventId'>;
}) {
  const user = await getCurrentUser();
  const event = await prisma.event.create({
    data: {
      title,
      startedAt,
      type,
      eventee: {
        connect: {
          id: eventeeId,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
      birthday: {
        create: {
          birthday: birthday.birthday,
          calendarType: birthday.calendarType,
        },
      },
    },
  });

  return event;
}

export async function createGreetingEvent({
  title,
  startedAt,
  type,
  eventeeId,
  greeting,
}: {
  title: string;
  startedAt: Date;
  type: 'GREETING';
  eventeeId: Eventee['id'];
  greeting: Omit<Greeting, 'eventId'>;
}) {
  const user = await getCurrentUser();

  const event = await prisma.event.create({
    data: {
      title,
      startedAt,
      type,
      eventee: {
        connect: {
          id: eventeeId,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
      greeting: {
        create: {
          repetition: greeting.repetition,
        },
      },
    },
  });

  return event;
}
