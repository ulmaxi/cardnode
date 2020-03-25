import { Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { RootState } from 'src/store';
import OTP, { OTPFormState } from './components/otp';
import PhoneNo, { PhoneForm } from './components/phone-no';
import { requestOTP } from './store/auth-effects';
import { authSelector, otpStateSelector } from './store/auth-selectors';
import './styles.scss';

export default function SignUpPage({ children }: RouterPath) {
  const OTPState = useSelector(otpStateSelector);
  const { getState, dispatch } = useStore<RootState>();
  const store = getState();
  const reqOTP = (form: PhoneForm) =>
    dispatch(requestOTP(form.identification) as any);
  const confirmOTP = (form: OTPFormState) =>
    dispatch(requestOTP(form.pin) as any);
  return (
    <div className="signup-page">
      <div className="sign-in">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {/* <div hidden={OTPState?.login ? true : false}>
          <PhoneNo
            submit={reqOTP}
            loading={useSelector(authSelector).loading}
          />
        </div> */}
        <div hidden={OTPState?.login?.loginId ? true : false}>
          <OTP
            submit={confirmOTP}
            loading={useSelector(authSelector).loading}
          />
        </div>

        <div
          className="signup-link"
          hidden={!useSelector(authSelector).loading}
        >
          <CircularProgress />
        </div>
        <div hidden={useSelector(authSelector).error ? false : true}>
          <Alert variant="filled" severity="error">
            {useSelector(authSelector).error}
          </Alert>
        </div>
        <div className="signup-link">
          <Link href="#" variant="body2">
            {'Already have an account? Sign In'}
          </Link>
        </div>
      </div>
    </div>
  );
}
