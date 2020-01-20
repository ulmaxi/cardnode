import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FieldType, GeneralProp, TextFieldOptions, validatedUpdate } from './util';

const DynamicTextInput = (field: FieldType, disabled: boolean) => {
  const options = field.options as TextFieldOptions;
  const [error, setError] = useState<string>();
  return ({ control, onChange }: GeneralProp) => {
    const update = validatedUpdate(onChange, setError);
    return (
      <>
        <Controller
          name={field.name}
          control={control}
          as={
            <TextField
              disabled = {disabled}
              margin="normal"
              fullWidth
              id={`${field.name}-input`}
              defaultValue={options?.value || ''}
              autoFocus={options?.autoFocus ?? false}
              variant="outlined"
              label={ field.label || field.name}
              type={options.inputType || 'text'}
              error={Boolean(error)}
              helperText={error ?? ''}
              required={options?.required ?? false}
              onChange={(event: any) => update(field, event.target.value)}
            />
          }
        />
      </>
    );
  };
};

export default DynamicTextInput;
