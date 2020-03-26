import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { RootState } from 'src/store';
import LoginForm from './components/login-form';
import { requestOTP, confirmOTP } from './store/auth-effects';
import { authSelector } from './store/auth-selectors';
import './components/styles.scss';
import { PhoneForm } from './components/phone-no';
import { OTPFormState } from './components/otp';

interface LoginPageState {
  showPhone: boolean;
}

export default function SignInSide() {
  const { dispatch } = useStore<RootState>();
  // manages the page state to show either OTP or Phone Input
  const [pageState, setPageState] = useState<LoginPageState>({
    showPhone: true,
  });
  // changes the page if it's success full after getting the OTP
  const reqOTP = (form: PhoneForm) =>
    dispatch(
      requestOTP({
        phoneNo: form.identification,
        onSuccess: () => setPageState({ showPhone: false }),
        registering: false,
      }) as any,
    );
  // verfies the OTP and changes the page location
  const reqAuth = (form: OTPFormState) =>
    dispatch(
      confirmOTP({
        otp: Number(form.otp),
        registering: false,
        onSuccess: () => console.log(`change the route`),
      }) as any,
    );
  return (
    <>
      <LoginForm
        showPhone={pageState.showPhone}
        loading={useSelector(authSelector).loading}
        error={useSelector(authSelector).error}
        phoneSubmit={reqOTP}
        OTPSubmit={reqAuth}
      />
    </>
  );
}
