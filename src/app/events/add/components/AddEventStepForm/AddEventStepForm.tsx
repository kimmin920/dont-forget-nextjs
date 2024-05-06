'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { z } from 'zod';
import { FormDataSchema } from './schema';
import { FieldName, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step1 from './Step1';
import Step2 from './Step2';
import { addEvent } from '../../actions';

const STEP = {
  min: 0,
  max: 2,
};

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'title',
      'type',
      'eventeeId',
      'birthday',
      'calendarType',
      'repetition',
    ],
  },
  {
    id: 'Step 2',
    name: 'Address',
    fields: ['country', 'state', 'city', 'street', 'zip'],
  },
  { id: 'Step 3', name: 'Complete', fields: [] },
];

export type AddEventStepFormType = z.infer<typeof FormDataSchema>;

function AddEventStepForm() {
  const methods = useForm<AddEventStepFormType>({
    resolver: zodResolver(FormDataSchema),
    mode: 'onChange',
    defaultValues: {
      calendarType: 'SOLAR',
      repetition: 'MONTHLY',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  const [currentStep, setCurrentStep] = useState(STEP.min);

  const nextStep = async () => {
    if (currentStep === STEP.max) {
      return;
    }

    const fields = steps[currentStep].fields;
    const output = await trigger(fields as any, { shouldFocus: true });

    if (!output) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep === STEP.min) {
      return;
    }

    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form action={addEvent}>
          {currentStep === 0 && <Step1 />}
          <Button type='submit'>SAVE</Button>
        </form>
      </FormProvider>

      {/* <Button onClick={prevStep}>PREV</Button>
      <Button onClick={nextStep}>NEXT</Button> */}
    </div>
  );
}

export default AddEventStepForm;
