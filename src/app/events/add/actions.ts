'use server';
import { createEventee } from '@/api/eventee';
import {
  CalendarType,
  EventType,
  PrismaClient,
  Repetition,
} from '@prisma/client';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export async function addEvent(formData: FormData) {
  const prisma = new PrismaClient();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  try {
    const eventType = formData.get('type') as EventType;
    const data = await prisma.event.create({
      data: {
        title: formData.get('title') as string,
        startedAt: new Date(),
        type: eventType,
        user: {
          connect: {
            id: user.id,
          },
        },
        eventee: {
          connect: {
            id: formData.get('eventeeId') as string,
          },
        },
        birthday:
          eventType === 'BIRTHDAY'
            ? {
                create: {
                  birthday: new Date(formData.get('birthday') as string),
                  calendarType: formData.get('calendarType') as CalendarType,
                },
              }
            : undefined,
        greeting:
          eventType === 'GREETING'
            ? {
                create: {
                  repetition: formData.get('repetition') as Repetition,
                },
              }
            : undefined,
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to add events:', error);
    return [];
  } finally {
    prisma.$disconnect();
  }
}

export async function addEventee(formData: FormData) {
  const prisma = new PrismaClient();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  let id = '';

  try {
    const data = await createEventee({
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      birthday: new Date(formData.get('birthday') as string),
      phoneNumber: formData.get('phoneNumber') as string,
    });

    id = data.id;
  } catch (error) {
    console.error('Failed to add events:', error);
    return [];
  } finally {
    prisma.$disconnect();
    id && redirect(`eventees/${id}`);
  }
}
