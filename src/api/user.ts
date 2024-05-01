import { PrismaClient } from '@prisma/client';
import { User } from '@supabase/supabase-js';

const prisma = new PrismaClient();

export async function findOrCreateUser({ user }: { user: User }) {
  const prismaUser = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: {
      id: user.id,
      email: user.email!,
      name: user.user_metadata.full_name,
    },
    update: {},
  });

  return prismaUser;
}
