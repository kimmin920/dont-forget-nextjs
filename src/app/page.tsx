import { Button } from '@/components/ui/button';
import { PrismaClient } from '@prisma/client';
import { deleteUser } from './action';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  return <>main</>;
}
