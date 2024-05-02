import { PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';

const prisma = new PrismaClient();
const supabase = createClient();

export async function findManyEventee() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const eventees = await prisma.eventee.findMany({
    where: {
      userId: user!.id,
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const eventee = await prisma.eventee.create({
    data: {
      name,
      role,
      userId: user!.id,
    },
  });

  return eventee;
}
