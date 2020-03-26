import React from 'react';
import { UnsavedModel, Emergency } from '@ulmax/frontend';
import { Field, ModelFieldType } from 'src/components';
import DynamicForm from 'src/components/dynamic-form';

const fields = (hospitals: string[]) =>  [
    {
      name: 'contact',
      type: Field.TextField,
      options: { inputType: 'text', required: true },
      label: 'Contact',
    },
    {
      name: 'assessment',
      type: Field.TextField,
      options: { inputType: 'text', required: true },
      label: 'Assessment',
    },
  {
    name: 'time',
    type: Field.TextField,
    options: { inputType: 'text', required: true },
    label: 'Time',
  },
  {
    name: 'hospital',
    type: Field.Select,
    options: { inputType: 'select', options: hospitals, required: false },
    label: 'Hospital',
  },
  {
    name: 'address',
    type: Field.TextField,
    options: { inputType: 'text', required: true },
    label: 'Address',
  },
] as Array<ModelFieldType<UnsavedModel<Emergency>>>;

export type EmergencyFormProp = {
  onSubmit(value: Emergency): any
  disable?: boolean
  hideSubmitBtn?: boolean
  hospitals: string[]
}

export default function EmergencyForm({ onSubmit, disable, hideSubmitBtn, hospitals }: EmergencyFormProp) {
  const Form = DynamicForm<Emergency>(fields(hospitals), disable);
  return (
    <>
      <Form onSubmit={onSubmit} hideSubmitBtn={hideSubmitBtn} />
    </>
  );
}
