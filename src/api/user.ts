import { PrismaClient } from '@prisma/client';
import { User } from '@supabase/supabase-js';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

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

export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  if (!user) {
    redirect('/login');
  }

  return user;
}
