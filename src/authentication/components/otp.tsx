import Button from '@material-ui/core/Button';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PinCode from '../../components/pin-code';
import { Theme } from '../theme';

export type OTPFormState = {
  identification: string;
};

export type OTPFormProp = {
  loading?: boolean;
  submit(form: OTPFormState): void;
};

export default function OTPForm() {
  const theme = Theme();
  const { control, handleSubmit, errors, watch } = useForm<OTPFormState>();
  const onSubmit = (data: OTPFormState) => console.log(data);
  watch('identification');

  return (
    <>
      {' '}
      <form className={theme.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={
            <PinCode
              onChange={v => {
                console.log(v);
              }}
              field={'password'}
              length={5}
            />
          }
          control={control}
          name="otp"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '2vh' }}
          // className={theme.submit}
        >
          Confirm
        </Button>
      </form>
    </>
  );
}
