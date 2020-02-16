import { Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import PhoneNo from './components/phone-no';
import './styles.scss';

export default function SignInSide() {
  return (
    <div className="sign-in">
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <PhoneNo />
      <div className="signup-link">
      <Link href="#" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
      </div>
    </div>
  );
}
