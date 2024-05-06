'use client';
import React, { useEffect, useState } from 'react';
import BirthdayPreference from '../../_components/BirthdayPreference';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

function EventPreferencePage() {
  const [message, setMessage] = useState('');

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: async (message: string) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: '며느리',
          to: '아버님',
          type: 'BIRTHDAY',
        }),
      });

      return response.body;
    },
    onSuccess: async (stream) => {
      if (!stream) {
        throw new Error('No stream');
      }
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setMessage((prev) => prev + chunkValue);
      }
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <div>
      <div>{message}</div>
      <Button onClick={() => sendMessage('hi')}>send message</Button>
      <BirthdayPreference />
    </div>
  );
}

export default EventPreferencePage;
