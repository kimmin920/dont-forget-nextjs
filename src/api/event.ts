import { Birthday, Eventee, Greeting, PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';

const prisma = new PrismaClient();
const supabase = createClient();

export async function findManyEvents() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const events = await prisma.event.findMany({
    where: {
      userId: user!.id,
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          id: user!.id,
        },
      },
    },
  });

  return event;
}
