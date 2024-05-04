import { findManyEventee } from '@/api/eventee';
import React from 'react';
import AddEventee from '../events/components/AddEventee';

async function EventeesPage() {
  const eventees = await findManyEventee();

  return (
    <div>
      eventees
      {eventees.map((eventee) => (
        <div key={eventee.id}>{eventee.name}</div>
      ))}
      <AddEventee />
    </div>
  );
}

export default EventeesPage;
