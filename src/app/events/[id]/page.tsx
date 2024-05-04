import { findOneEvent } from '@/api/event';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

async function EventDetailPage({ params }: Props) {
  const event = await findOneEvent(params.id);

  return (
    <div>
      이벤트: {event.title}
      TO: {event.eventee.name}
    </div>
  );
}

export default EventDetailPage;
