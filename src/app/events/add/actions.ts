'use server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';

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
    const eventee = await prisma.eventee.upsert({
      where: {
        id: '1',
      },
      create: {
        name: '김민우',
        role: '청년',
        userId: user.id!,
      },
      update: {},
    });

    if (!eventee) {
      return;
    }

    const data = await prisma.event.create({
      data: {
        title: formData.get('title') as string,
        startedAt: new Date(),
        type: 'BIRTHDAY',
        user: {
          connect: {
            id: user.id,
          },
        },
        eventee: {
          connect: {
            id: eventee.id,
          },
        },
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
