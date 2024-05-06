import { findManyEventee } from '@/api/eventee';
import React from 'react';
import AddEventee from '../events/_components/AddEventee';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eventee } from '@prisma/client';
import EventeeProfile from './_components/profileItem';

async function EventeesPage() {
  const eventees = await findManyEventee();

  return (
    <div>
      eventees
      {eventees.map((eventee) => (
        <Link href={`eventees/${eventee.id}`} key={eventee.id}>
          <EventeeProfile eventee={eventee} />
        </Link>
      ))}
      <AddEventee />
    </div>
  );
}

export default EventeesPage;
