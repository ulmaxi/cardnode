import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

export type SelectCountryProp = {
  onChange(value: string): any;
};

const SelectCountry = ({ onChange }: SelectCountryProp) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  return (
    <>
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} id="country-label">
          Country
        </InputLabel>
        <Select
          labelId="country-label"
          value={'NG'}
          onChange={event => onChange(event.target.value as string)}
        >
          {getCountries().map((country: string) => (
            <MenuItem key={country} value={country}>
              {(en as any)[country]} +{getCountryCallingCode(country)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectCountry;
