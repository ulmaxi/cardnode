import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { DynamicUpdate, FieldType, GeneralProp, SelectFieldOptions } from './util';

type EmbededSelectProp = {
  field: FieldType;
  update: DynamicUpdate;
  disabled: boolean;
};

const EmbededSelect = ({ field, update, disabled }: EmbededSelectProp) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [state, setValue] = useState();
  const options: any[] = (field.options as SelectFieldOptions)?.options ?? [];
  return (
    <>
      <FormControl style={{ marginTop: '3vh' }} fullWidth variant="outlined">
        <InputLabel ref={inputLabel} id={`${field.name}-label`}>
          {field.label || field.name}
        </InputLabel>
        <Select
          disabled={disabled}
          autoWidth
          value={state}
          labelId={`${field.name}-label`}
          onChange={event => {
            const value = event.target.value as any;
            setValue(value);
            if (value && value !== '') {
              update(field.name, value);
            }
          }}
        >
          {options.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default function DynamicSelect(field: FieldType, disabled: boolean) {
  return ({ onChange, control }: GeneralProp) => {
    return (
      <>
        <Controller
          name={field.name}
          control={control}
          as={<EmbededSelect disabled={disabled} field={field} update={onChange} />}
        />
      </>
    );
  };
}
