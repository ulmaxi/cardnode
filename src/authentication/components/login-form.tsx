import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { Link } from "@reach/router";
import React from 'react';
import OTP, { OTPFormState } from './otp';
import PhoneNo, { PhoneForm } from './phone-no';

/**
 * The loginFormProp options
 */
interface LoginFormProp {
  showPhone: boolean;
  error?: string;
  loading: boolean;
  phoneSubmit: (value: PhoneForm) => any;
  OTPSubmit: (value: OTPFormState) => any;
}

/**
 * Login Form component for switching between the
 * OTP or Phone
 */
function LoginForm({
  showPhone,
  error,
  loading,
  phoneSubmit,
  OTPSubmit,
}: LoginFormProp) {
  return (
    <>
      <div className="sign-in">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
          <Link to="register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
