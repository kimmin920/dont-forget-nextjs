'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eventee } from '@prisma/client';

import { createClient } from '@utils/supabase/client';
import { useEffect, useState } from 'react';

async function fetchEventees() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('Eventee')
    .select('*')
    .eq('userId', user!.id);

  return data;
}

export default function EventeeSelectBox({
  onValueChange,
}: {
  onValueChange?: (value: string) => void;
}) {
  const [eventees, setEventees] = useState<Eventee[]>([]);

  useEffect(() => {
    async function getEventees() {
      const data = await fetchEventees();
      setEventees((data ?? []) as Eventee[]);
    }

    getEventees();
  }, []);

  return (
    <Select onValueChange={onValueChange} name='eventeeId'>
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
