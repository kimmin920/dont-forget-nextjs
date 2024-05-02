import React, { useState } from 'react';
import { addEvent } from './actions';
import { Button } from '@/components/ui/button';
import { PrismaClient } from '@prisma/client';
import { EventeeSelect } from '@/app/events/components/EventeeDrawer';
import AddEventForm from './components/AddEventForm';
import AddEventee from '../components/AddEventee';

function AddEvent() {
  return (
    <AddEventForm>
      <div className='flex flex-col'>
        <EventeeSelect />
        <AddEventee />
      </div>
    </AddEventForm>
  );
}

export default AddEvent;
