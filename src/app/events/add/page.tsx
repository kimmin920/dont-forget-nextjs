'use client';
import React, { useState } from 'react';
import { addEvent } from './actions';
import { Button } from '@/components/ui/button';
import { PrismaClient } from '@prisma/client';
import { EventeeSelect } from '@/app/events/components/EventeeSelect';
import AddEventForm from './components/AddEventForm';

function AddEvent() {
  return (
    <>
      <AddEventForm>
        <EventeeSelect />
      </AddEventForm>
    </>
  );
}

export default AddEvent;
