'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import { findManyEventee } from '@/api/eventee';
import EventeeSelectBox from './EventeeSelect';
import { useState } from 'react';

export function EventeeSelect() {
  const [selectedEventeeId, setSelectedEventeeId] = useState<string | null>(
    null
  );

  return (
    <Drawer>
      {selectedEventeeId && (
        <input hidden name='eventeeId' value={selectedEventeeId} />
      )}

      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <EventeeSelectBox
          onValueChange={(value) => setSelectedEventeeId(value)}
          value={selectedEventeeId ?? ''}
        />

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
