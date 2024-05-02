'use client';
import React, { useState } from 'react';
import { addEvent } from '../actions';
import { Button } from '@/components/ui/button';
import { EventeeSelect } from '../../components/EventeeDrawer';

function AddEventForm({ children }: { children: React.ReactNode }) {
  return (
    <>
      <form action={addEvent}>
        <input name='title' type='text' />
        {children}

        <Button type='submit'>ADD</Button>
      </form>
    </>
  );
}

export default AddEventForm;
