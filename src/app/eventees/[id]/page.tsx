import { findOneEventee } from '@/api/eventee';
import React from 'react';
import EventeeProfile from '../_components/profileItem';

type Props = {
  params: {
    id: string;
  };
};

async function EventeeDetailPage({ params }: Props) {
  const { id } = params;

  const eventee = await findOneEventee(id);

  return (
    <div>
      <EventeeProfile eventee={eventee} />
    </div>
  );
}

export default EventeeDetailPage;
