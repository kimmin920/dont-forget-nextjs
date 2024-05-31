import { createClient } from '@utils/supabase/server';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { signOut } from '@/app/login/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CircleUser, Menu, Package2, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { Input } from './input';
import MainLogo from './main-logo';
import { User } from '@supabase/supabase-js';
import { UserMetadata } from '@/app/profile/page';

const NAVS = [
  {
    href: '/notification',
    title: 'Notification',
  },
  {
    href: '/events',
    title: 'Events',
  },
  {
    href: '/eventees',
    title: 'Eventees',
  },
  { href: '/devices', title: 'Devices' },
];

async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <></>;
  }

  const userMetadata = user.user_metadata as UserMetadata;

  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link
          href='/'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <MainLogo />
          <span>Donfo</span>
        </Link>

        {NAVS.map((navItem) => (
          <Link
            key={navItem.href}
            href={navItem.href}
            className='text-muted-foreground transition-colors hover:text-foreground'
          >
            {navItem.title}
          </Link>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              href='/'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <MainLogo />
              <span>Donfo</span>
            </Link>
            {NAVS.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className='hover:text-foreground'
              >
                {navItem.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <div className='m-auto'>
          <MainLogo className='md:hidden' />
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <Avatar>
                  <AvatarImage src={userMetadata.avatar_url} alt='@shadcn' />
                  <AvatarFallback>{userMetadata.name}</AvatarFallback>
                </Avatar>

                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form action={signOut}>
                  <button type='submit'>Log Out</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant='outline'>
            <Link href='/login'>Sign Up</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
