import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { PersonalBiodata } from '@ulmax/frontend';
import React from 'react';

interface SelectCardMembersProp {
  onChange: (member: PersonalBiodata) => any;
  members: PersonalBiodata[];
}

const SelectCardMembers = ({ onChange, members }: SelectCardMembersProp) => {
  return (
    <>
      <FormControl style={{ height: '10vh' }}>
        <InputLabel id="demo-simple-select-label">Members</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          onChange={event => onChange(members[Number(event.target.value)])}
        >
          {members.map(({ firstname, lastname }, i) => (
            <MenuItem key={i} value={i}>
              {`${firstname} ${lastname}`}{' '}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectCardMembers;
