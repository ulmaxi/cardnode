import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import React, { useState } from 'react';
import * as input from 'react-phone-number-input/input';
import SelectCountry from './select-country';

export type MobileInputState = {
  country: string;
  value: number;
  error?: string;
  isValid?: boolean;
};
  
type MobileNoInputProp = {
  disabled?: boolean;
  onChange(value: string): any;
};

const InvalidMobileNoError = new Error(`Invalid mobile number provided`);

const validatedFormat = ({ country, value }: MobileInputState) => {
  const no = input.formatPhoneNumberIntl(`+(${input.getCountryCallingCode(country)}) ${value}`);
  const isValid = input.isValidPhoneNumber(no);
  if (!isValid) {
    throw InvalidMobileNoError;
  }
  return no;
}

const MobileNoInput = (prop: MobileNoInputProp) => {
  const [state, setState] = useState<MobileInputState>({
    country: 'NG',
    value: 0,
  });
  const update = (updated: MobileInputState) => {
    try {
      setState({...updated, error: undefined});
      prop.onChange(validatedFormat(updated));
    } catch (error) {
      setState({...state, error: error.message });
    }
  } ;
  return (
    <>
      <SelectCountry disabled= { prop.disabled  }  onChange={country => update({ ...state, country })} />
      <TextField
        required
        disabled = {prop.disabled || false }
        margin="normal"
        fullWidth
        id="identification"
        autoFocus
        variant="outlined"
        label="Phone Number"
        name="identification"
        type="string"
        error ={ Boolean(state.error) }
        helperText = { state.error ?? '' }
        onChange ={(event: any) =>
          update({ ...state, value: Number(event.target.value) })
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIphoneIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default MobileNoInput;
