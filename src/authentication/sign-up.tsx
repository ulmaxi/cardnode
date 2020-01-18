import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Login from './login';
import { Theme } from './theme';

const SignUp: any = () => {
  const classes = Theme();
  return (
    <Grid container justify="center" alignItems="center" component="main" className={classes.root}>
      <CssBaseline />
      <Grid direction="row" justify="center" alignItems="center">
        <Login />
      </Grid>
    </Grid>
  );
};

export default SignUp;
