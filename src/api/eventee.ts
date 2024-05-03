import { PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './user';

const prisma = new PrismaClient();
const supabase = createClient();

export async function findManyEventee() {
  const user = await getCurrentUser();

  const eventees = await prisma.eventee.findMany({
    where: {
      userId: user.id,
    },
  });

  return eventees;
}

export async function createEventee({
  name,
  role,
  userId,
}: {
  name: string;
  role: string;
  userId: string;
}) {
  const user = await getCurrentUser();

  const eventee = await prisma.eventee.create({
    data: {
      name,
      role,
      userId: user.id,
    },
  });

  return eventee;
}
