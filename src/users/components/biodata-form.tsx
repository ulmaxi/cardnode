import { Field, FieldType } from '@ulmax/web-components';
import DynamicForm from '@ulmax/web-components/dynamic-form';
import React from 'react';

const fields: FieldType[] = [
  { name: 'firstname', type: Field.TextField, options: { inputType: 'text' } },
  { name: 'lastname', type: Field.TextField, options: { inputType: 'text' } },
  {
    name: 'gender',
    type: Field.Select,
    options: { options: ['male', 'female'] },
  },
  { name: 'email', type: Field.TextField, options: { inputType: 'email' } },
  { name: 'address', type: Field.TextField, options: { inputType: 'text' } },
  { name: 'dob', type: Field.TextField, options: { inputType: 'date' } },
  { name: 'town', type: Field.TextField, options: { inputType: 'text' } },
];

export default function UserBiodataForm() {
  const Form = DynamicForm(fields);
  return (
    <>
      <Form onSubmit={(value: any) => console.log(value)} />
    </>
  );
}
