'use server';
import { createBirthdayEvent, createGreetingEvent } from '@/api/event';
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
  let eventId = '';

  try {
    const eventType = formData.get('type') as EventType;

    if (eventType === 'BIRTHDAY') {
      const event = await createBirthdayEvent({
        title: formData.get('title') as string,
        startedAt: new Date(),
        type: 'BIRTHDAY',
        eventeeId: formData.get('eventeeId') as string,
        birthday: {
          birthday: new Date(formData.get('birthday') as string),
          calendarType: formData.get('calendarType') as CalendarType,
        },
      });

      eventId = event.id;
    }

    if (eventType === 'GREETING') {
      const event = await createGreetingEvent({
        title: formData.get('title') as string,
        startedAt: new Date(),
        type: 'GREETING',
        eventeeId: formData.get('eventeeId') as string,
        greeting: {
          repetition: formData.get('repetition') as Repetition,
        },
      });

      eventId = event.id;
    }
  } catch (error) {
    console.error('Failed to add events:', error);
    return [];
  } finally {
    eventId && redirect(`/events/${eventId}`);
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
