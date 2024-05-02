'use client';

import { Button } from '@/components/ui/button';
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

import React from 'react';
import { addEventee } from '../add/actions';

function AddEventee() {
  return (
    <Drawer>
      <DrawerTrigger>Add Eventee</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <form action={addEventee}>
          name: <input type='text' name='name' />
          role :<input type='text' name='role' />
          <DrawerFooter>
            <Button type='submit'>Submit</Button>
            <DrawerClose>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default AddEventee;
