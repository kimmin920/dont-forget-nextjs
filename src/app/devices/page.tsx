import { User } from '@prisma/client';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { PrismaClient } from '@prisma/client';

const supabase = createClient();
const prisma = new PrismaClient();

async function getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
     return null;
    }

    const prismaUser = await prisma.user.findUnique({ where: {
        id: user.id,
    }})

    return prismaUser;
  }

async function DevicesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='max-w-[200px]'>
      token: {user.deviceToken}
    </div>
  )
}

export default DevicesPage