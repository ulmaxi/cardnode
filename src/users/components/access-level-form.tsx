import { UlmaxCardLevel } from '@ulmax/frontend';
import React from 'react';
import { Field, formValueLoader, ModelFieldType } from 'src/components';
import DynamicForm from 'src/components/dynamic-form';

/**
 * represent the data structure for
 * access level form
 */
export interface AccessLevelFormState {
  level: UlmaxCardLevel;
  identification: string;
}

const fields: Array<ModelFieldType<AccessLevelFormState>> = [
  {
    name: 'level',
    type: Field.Select,
    label: 'Authority',
    options: { options: [UlmaxCardLevel.Admin, UlmaxCardLevel.Minor] },
  },
  {
    name: 'identification',
    type: Field.TextField,
    options: { inputType: 'text' },
  },
];

/**
 * prop information for access level form
 */
export type AcessLevelFormProp = {
  onSubmit(value: any): any;
  disable?: boolean;
  value?: AccessLevelFormState;
  hideSubmitBtn?: boolean;
};

/**
 * displays form for access level form
 */
export default function AcessLevelForm({
  onSubmit,
  disable,
  hideSubmitBtn,
  value,
}: AcessLevelFormProp) {
  const Form = DynamicForm(formValueLoader(fields, value), disable);
  return (
    <>
      <Form onSubmit={onSubmit} hideSubmitBtn={hideSubmitBtn} />
    </>
  );
}
