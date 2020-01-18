import Button from '@material-ui/core/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import Selector from './dynamic-forms/select-field';
import { DynamicUpdate, FieldType } from './dynamic-forms/util';

export interface FieldControl {
  control: any;
  update: DynamicUpdate;
}

export const FormField = (field: FieldType) => {
  const Selected = Selector(field);
  return ({ control, update }: FieldControl) => {
    return (
      <>
        <Selected
          control={control}
          onChange={(field: string, value: any) => update(field, value)}
        />
      </>
    );
  };
};

export type DynamicFormSubmit<T> = (value: T) => any;
export type DynamicFormProp<T> = { onSubmit: DynamicFormSubmit<T> };

function DynamicForm<T>(fields: FieldType[]) {
  const elements = fields.map(f => FormField(f));
  const Form = ({ onSubmit }: DynamicFormProp<T>) => {
    const { handleSubmit, control, setValue } = useForm<T>();
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          {elements.map((FieldElement, index) => (
            <FieldElement key={index} control={control} update={setValue} />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '2vh' }}
          >
            Okay
          </Button>
        </form>
      </>
    );
  };
  return Form;
}

export default DynamicForm;
