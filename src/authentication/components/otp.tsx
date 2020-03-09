import Button from '@material-ui/core/Button';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PinCode from 'src/components/pin-code';
import { Theme } from '../theme';

export type OTPFormState = {
  pin: string;
};

export type OTPFormProp = {
  loading?: boolean;
  submit(form: OTPFormState): any;
};

export default function OTPForm({ submit, loading }: OTPFormProp) {
  const theme = Theme();
  const { control, handleSubmit, setValue } = useForm<OTPFormState>();

  return (
    <div>
      <form className={theme.form} onSubmit={handleSubmit(submit)}>
        <Controller
          as={
            <PinCode
              onChange={value => {
                setValue('pin', `${value}`);
              }}
              field={'password'}
              length={5}
            />
          }
          control={control}
          name="otp"
        />
        <Button
          hidden={loading}
          type="submit"
          fullWidth
          variant="contained"
          style={{
            marginTop: '2vh',
            backgroundColor: 'purple',
            color: 'white',
          }}
          // className={theme.submit}
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}
