import { PersonalBiodata, UnsavedModel } from '@ulmax/frontend';
import React from 'react';
import { Field, ModelFieldType } from 'src/components';
import DynamicForm from 'src/components/dynamic-form';

const fields: Array<ModelFieldType<UnsavedModel<PersonalBiodata>>> = [
  { name: 'firstname', type: Field.TextField, options: { inputType: 'text', } },
  {
    name: 'lastname',
    type: Field.TextField,
    options: { inputType: 'text' },
    label: 'Surname',
  },
  {
    name: 'gender',
    type: Field.Select,
    options: { options: ['male', 'female'] },
  },
  { name: 'email', type: Field.TextField, options: { inputType: 'email' } },
  { name: 'address', type: Field.TextField, options: { inputType: 'text' } },
  {
    name: 'dob',
    type: Field.TextField,
    options: { inputType: 'date' },
    label: 'Date of Birth',
  },
  { name: 'town', type: Field.TextField, options: { inputType: 'text' } },
];

export type UserBiodataFormProp = {
  onSubmit(value: any): any
  disable?: boolean
  hideSubmitBtn?: boolean
}

export default function UserBiodataForm({ onSubmit, disable, hideSubmitBtn }: UserBiodataFormProp) {
  const Form = DynamicForm(fields, disable);
  return (
    <>
      <Form onSubmit={onSubmit} hideSubmitBtn={hideSubmitBtn} />
    </>
  );
}
