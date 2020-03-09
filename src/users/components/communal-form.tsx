import { CommunalData, UnsavedModel } from '@ulmax/frontend';
import React from 'react';
import { DynamicFieldType, Field } from 'src/components';
import DynamicForm from 'src/components/dynamic-form';
import { FieldBuilder } from 'src/components/dynamic-forms/builder';
import { normalTextField, requiredTextField } from './helper';

type FormData = UnsavedModel<CommunalData>;

const fields: Array<DynamicFieldType<FormData>> = [
  requiredTextField<FormData>('nextofkin', Field.TextField, 'Next of Kin '),
  requiredTextField<FormData>(
    'nextofkinphoneNo',
    Field.TextField,
    'Kin PhoneNo',
  ),
  new FieldBuilder<FormData>('maritalstatus', Field.Select, 'Marital Status')
    .options({
      options: ['Single', 'Married', 'Divorced'],
      required: true,
    })
    .compile(),
  new FieldBuilder<FormData>('religion', Field.Select)
    .options({
      options: ['Christianity', 'Muslim', 'Traditional'],
      required: true,
    })
    .compile(),
  normalTextField<FormData>('employer', Field.TextField),
  normalTextField<FormData>(
    'employerphoneNo',
    Field.TextField,
    `Employer's contact`,
  ),
  requiredTextField<FormData>('lga', Field.TextField, 'LGA'),
  requiredTextField<FormData>('state', Field.TextField, 'State'),
];

export type UserCommunalFormProp = {
  onSubmit(value: any): any
  disable?: boolean
}

export default function UserCommunalForm({ onSubmit, disable }: UserCommunalFormProp) {
  const Form = DynamicForm(fields, disable);
  return (
    <>
      <Form onSubmit={onSubmit} />
    </>
  );
}
