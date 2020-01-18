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

export const PhoneNoForm = () => {
  const theme = Theme();
  const { setValue, handleSubmit, errors, control } = useForm<PhoneForm>();
  const onSubmit = (data: PhoneForm) => console.log(data);

  return (
    <>
      {' '}
      <form className={theme.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="identification"
          as={
            <MobileNoInput
              onChange={value => {
                console.log(value);
                setValue('identification', value);
              }}
            />
          }
          control={control}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '2vh' }}
        >
          Authorize
        </Button>
      </form>
    </>
  );
};

export default PhoneNoForm;
