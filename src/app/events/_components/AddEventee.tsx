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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
          <div className='grid gap-6 p-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name'>이름</Label>
              <Input type='text' name='name' id='name' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='role'>호칭</Label>
              <Input type='text' name='role' id='role' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='phoneNumber'>전화번호</Label>
              <Input
                type='tel'
                name='phoneNumber'
                id='phoneNumber'
                pattern='[0-1]{3}[0-9]{4}[0-9]{4}'
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='birthday'>생일</Label>
              <Input type='date' name='birthday' id='birthday' />
            </div>
            <DrawerFooter>
              <Button type='submit'>Submit</Button>
              <DrawerClose>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default AddEventee;
