import { Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { RootState } from 'src/store';
import PhoneNo, { PhoneForm } from './components/phone-no';
import { requestOTP } from './store/auth-effects';
import { authSelector, otpStateSelector } from './store/auth-selectors';
import './styles.scss';

export default function SignInSide() {
  const OTPState = useSelector(otpStateSelector);
  const { getState, dispatch} = useStore<RootState>();
  const store = getState();
  const reqOTP = (form: PhoneForm) => {
    dispatch(requestOTP(form.identification) as any);
  };
  return (
    <div className="sign-in">
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <div  >
        <PhoneNo submit={reqOTP} loading={useSelector(authSelector).loading}  />
      </div>
      <div className="signup-link" hidden={!useSelector(authSelector).loading}>
        <CircularProgress    />
      </div>
      <div hidden={ useSelector(authSelector).error ? false : true  }>
        <Alert variant="filled" severity="error">
        { useSelector(authSelector).error }
        </Alert>
      </div>
      <div className="signup-link">
        <Link href="#" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
}
