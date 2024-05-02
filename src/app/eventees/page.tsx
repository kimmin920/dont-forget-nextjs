import { findManyEventee } from '@/api/eventee';
import React from 'react';

async function EventeesPage() {
  const eventees = await findManyEventee();

  return (
    <div>
      eventees
      {eventees.map((eventee) => (
        <div key={eventee.id}>{eventee.name}</div>
      ))}
    </div>
  );
}

export default EventeesPage;
