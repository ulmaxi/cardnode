import Button from '@material-ui/core/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import Selector from './dynamic-forms/selector';
import { Theme } from './dynamic-forms/theme';
import { DynamicFieldType, DynamicUpdate, FieldType } from './dynamic-forms/util';

export interface FieldControl {
  control: any;
  update: DynamicUpdate;
}

export const FormField = (field: FieldType, disabled: boolean) => {
  const Selected = Selector(field, disabled);
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
export type DynamicFormProp<T> = { onSubmit: DynamicFormSubmit<T>, hideSubmitBtn?: boolean };

function DynamicForm<T, K = any>(fields: Array<DynamicFieldType<K>>, disabled = false) {
  const elements = fields.map(f => FormField(f as FieldType, disabled));
  const Form = ({ onSubmit, hideSubmitBtn }: DynamicFormProp<T>) => {
    const classes = Theme();
    const { handleSubmit, control, setValue } = useForm<T>();
    console.log({ hideSubmitBtn, disabled })
    return (
      <>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {elements.map((FieldElement, index) => (
            <FieldElement key={index} control={control} update={setValue} />
          ))}
          <div hidden={hideSubmitBtn}>
          <Button
          disabled = { disabled }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '2vh' }}
          >
            Confirm
          </Button>
          </div>
        </form>
      </>
    );
  };
  return Form;
}

export default DynamicForm;
