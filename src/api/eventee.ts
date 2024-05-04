import { PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';
import { getCurrentUser } from './user';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function findManyEventee() {
  const user = await getCurrentUser();

  const eventees = await prisma.eventee.findMany({
    where: {
      userId: user.id,
    },
  });

  return eventees;
}

export async function findOneEventee(id: string) {
  const user = await getCurrentUser();

  const eventee = await prisma.eventee.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!eventee) {
    redirect('/404');
  }

  return eventee;
}

export async function createEventee({
  name,
  role,
  birthday,
  phoneNumber,
}: {
  name: string;
  role: string;
  birthday: Date;
  phoneNumber: string;
}) {
  const user = await getCurrentUser();

  const eventee = await prisma.eventee.create({
    data: {
      name,
      role,
      birthday,
      phoneNumber,
      userId: user.id,
    },
  });

  return eventee;
}
