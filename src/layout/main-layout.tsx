import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      {children}
    </main>
  );
}
