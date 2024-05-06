'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eventee } from '@prisma/client';

import { useEffect, useState } from 'react';

async function fetchEventees() {
  const eventees = await fetch('/api/eventee', {
    method: 'GET',
  });

  return await eventees.json();
}

export default function EventeeSelectBox({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string, eventee: Eventee) => void;
}) {
  const [eventees, setEventees] = useState<Eventee[]>([]);

  useEffect(() => {
    async function getEventees() {
      const data = await fetchEventees();
      setEventees(data.eventees ?? []);
    }

    getEventees();
  }, []);

  const handleValueChange = (value: string) => {
    const eventee = eventees.find((eventee) => eventee.id === value);
    onValueChange(value, eventee!);
  };

  return (
    <Select value={value} onValueChange={handleValueChange} name='eventeeId'>
      <SelectTrigger id='eventeeId' className='w-full'>
        <SelectValue placeholder='이벤티를 선택하세요.' />
      </SelectTrigger>
      <SelectContent>
        {eventees.map((eventee) => (
          <SelectItem key={eventee.id} value={eventee.id}>
            {eventee.name}, {eventee.role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
