'use client';

import { findOneEvent } from '@/api/event';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSchemaType } from '@/lib/validators/message';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

function AIMessage(props: Awaited<ReturnType<typeof findOneEvent>>) {
  const { type, eventee, user } = props;
  const [message, setMessage] = useState('');

  const { mutate: generateAIMessage, isPending } = useMutation({
    mutationKey: ['generateAIMessage'],
    mutationFn: async (messageProps: MessageSchemaType) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: messageProps.from,
          to: messageProps.to,
          type: messageProps.type,
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
    onMutate: () => {
      setMessage('');
    },
  });

  return (
    <div>
      <Card className='max-w-[200px]'>{message}</Card>
      <Button
        onClick={() =>
          generateAIMessage({
            from: user.name,
            to: eventee.role,
            type,
          })
        }
      >
        메세지 생성하기
      </Button>
    </div>
  );
}

export default AIMessage;
