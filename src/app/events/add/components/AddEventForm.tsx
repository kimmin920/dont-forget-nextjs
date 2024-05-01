'use client';
import React, { useState } from 'react';
import { addEvent } from '../actions';
import { Button } from '@/components/ui/button';

function AddEventForm({ children }: { children: React.ReactNode }) {
  const [openEventeeSelect, setOpenEventeeSelect] = useState(false);

  function onClickSelectEventee() {
    console.log('????');
    setOpenEventeeSelect(true);
  }

  return (
    <>
      {openEventeeSelect && children}

      <form action={addEvent}>
        <input name='title' type='text' />
        <Button type='button' onClick={onClickSelectEventee}>
          Select Eventee
        </Button>

        <Button type='submit'>ADD</Button>
      </form>
    </>
  );
}

export default AddEventForm;
