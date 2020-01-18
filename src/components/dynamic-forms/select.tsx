import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { DynamicUpdate, FieldType, GeneralProp, SelectFieldOptions } from './util';

type EmbededSelectProp = { field: FieldType; update: DynamicUpdate };

const EmbededSelect = ({ field, update }: EmbededSelectProp) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [state, setValue] = useState();
  const options: any[] = (field.options as SelectFieldOptions)?.options ?? [];
  return (
    <>
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} id={`${field.name}-label`}>
          {field.name}
        </InputLabel>
        <Select
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

export default function DynamicSelect(field: FieldType) {
  return ({ onChange, control }: GeneralProp) => {
    return (
      <>
        <Controller
          name={field.name}
          control={control}
          as={<EmbededSelect field={field} update={onChange} />}
        />
      </>
    );
  };
}
