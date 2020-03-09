import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';

export default function DesktopBar({ barClass }: { barClass?: string }) {
  return (
    <>
      <div className={barClass || 'toolbar'}>
        <TextField className="input" variant={'outlined'} label="Search" />
        <Button
          className="log-out-btn"
          size={'medium'}
          variant="outlined"
          color="secondary"
        >
          Log Out
        </Button>
      </div>
    </>
  );
}
