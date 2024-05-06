import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AddEventStepFormType } from './AddEventStepForm';

function Step2() {
  const form = useFormContext<AddEventStepFormType>();

  const messageType = form.getValues('type');
  return <div>Step2</div>;
}

export default Step2;
