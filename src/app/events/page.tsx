import { findManyEvents } from '@/api/event';
import { Button } from '@/components/ui/button';
import { Event, PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React, { Suspense } from 'react';

async function fetchEvents(): Promise<Event[]> {
  const prisma = new PrismaClient();

  try {
    const events = await prisma.event.findMany();

    return events;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  } finally {
    prisma.$disconnect();
  }
}

async function EventPage() {
  const events = await findManyEvents();

  if (events.length === 0) {
    return (
      <>
        <div>이벤트가 없어요</div>
        <AddEvent />
      </>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <AddEvent />
        {events.map((event) => (
          <div key={event.id}>{event.title}</div>
        ))}
      </div>
    </Suspense>
  );
}

function AddEvent() {
  return <Link href={'/events/add'}>추가하기</Link>;
}
export default EventPage;
