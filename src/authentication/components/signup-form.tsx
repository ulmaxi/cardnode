import React from 'react';

import { Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import './styles.scss';
import PhoneNo, { PhoneForm } from './phone-no';
import OTP, { OTPFormState } from './otp';

/**
 * options form signup form component
 */
export interface SignUpFormOptions {
  showPhone: boolean;
  phoneSubmit: (value: PhoneForm) => any;
  OTPSubmit: (value: OTPFormState) => any;
  loading: boolean;
  error?: string;
}

/**
 * Component display for Signup Page
 */
function SignupForm({
  showPhone,
  phoneSubmit,
  OTPSubmit,
  loading,
  error,
}: SignUpFormOptions) {
  return (
    <div className="signup-page">
      <div className="sign-in">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <div hidden={!showPhone}>
          <PhoneNo submit={phoneSubmit} loading={loading} />
        </div>
        <div hidden={showPhone}>
          <OTP submit={OTPSubmit} loading={loading} />
        </div>

        <div className="signup-link" hidden={!loading}>
          <CircularProgress />
        </div>
        <div hidden={error ? false : true}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </div>
        <div className="signup-link">
          <Link href="/" variant="body2">
            {'Already have an account? Sign In'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;