import Button from '@material-ui/core/Button';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import MobileNoInput from '../../components/mobile-number';
import { Theme } from '../theme';

export type PhoneForm = {
  identification: string;
};

export type PhoneFormProp = {
  loading?: boolean;
  submit(form: PhoneForm): void;
};

export const PhoneNoForm = ({ submit, loading }: PhoneFormProp) => {
  const theme = Theme();
  const { setValue, handleSubmit, errors, control } = useForm<PhoneForm>();

  return (
    <>
      {' '}
      <form  className={theme.form} onSubmit={handleSubmit(submit)}>
        <Controller
          name="identification"
          as={
            <MobileNoInput
              onChange={value => {
                setValue('identification', value);
              }}
            />
          }
          control={control}
        />
        <Button
        disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          style={{ marginTop: '2vh', backgroundColor: 'purple', color: 'white' }}
        >
          Authorize
        </Button>
      </form>
    </>
  );
};

export default PhoneNoForm;
