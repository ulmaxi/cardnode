import React from 'react';
import ReactCodeInput from 'react-code-input';

export type PinCodeProp = {
  field: 'number' | 'text' | 'password';
  length: number;
  onChange(value: string | number): any;
};

const PinCode = ({ field, length, onChange }: PinCodeProp) => (
  <>
    <ReactCodeInput
      onChange={(value: any) => {
        onChange(value)
      }}
      type={field}
      fields={length}
    />
  </>
);

export default PinCode;
