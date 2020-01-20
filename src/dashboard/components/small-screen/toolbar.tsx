import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

export default function MobileBar({ barClass }: { barClass?: string }) {
  return (
    <>
      <AppBar color={'inherit'} position={'fixed'}>
        <Toolbar variant={'regular'} className={barClass}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <TextField
            fullWidth
            className="input"
            variant={'outlined'}
            label="Search"
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
