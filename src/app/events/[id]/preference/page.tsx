import React from 'react';
import BirthdayPreference from '../../_components/BirthdayPreference';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import AIMessage from './_components/AIMessage';
import { findOneEvent } from '@/api/event';

type Props = {
  params: {
    id: string;
  };
};

async function EventPreferencePage({ params }: Props) {
  const event = await findOneEvent(params.id);

  return (
    <div>
      from: {event.user.name}
      to: {event.eventee.role}
      type: {event.type}
      <AIMessage {...event} />
      <BirthdayPreference />
    </div>
  );
}

export default EventPreferencePage;
