import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { Link } from "@reach/router";
import React from 'react';
import OTP, { OTPFormState } from './otp';
import PhoneNo, { PhoneForm } from './phone-no';
import './styles.scss';

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
          <Link to="/">
            {'Already have an account? Sign In'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;