import { Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import PhoneNo from './components/phone-no';
import { Theme } from './theme';

export default function SignInSide() {
  const classes = Theme();
  return (
    <div className={classes.centeredPaper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <PhoneNo />
      <Grid style={{ marginTop: '10%' }} container>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
