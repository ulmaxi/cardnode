import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { RootState } from 'src/store';
import SignUpForm from './components/signup-form';
import { requestOTP, confirmOTP } from './store/auth-effects';
import { authSelector } from './store/auth-selectors';
import './components/styles.scss';
import { PhoneForm } from './components/phone-no';
import { OTPFormState } from './components/otp';

/**
 * state structure for signup page
 */
interface SignUpPageState {
  showPhone: boolean;
}

/**
 * The main SignUp page to join cardnode
 */
export default function SignUpPage({ children }: RouterPath) {
  const { dispatch, getState } = useStore<RootState>();
  // manages the page state to show either OTP or Phone Input
  const [pageState, setPageState] = useState<SignUpPageState>({
    showPhone: true,
  });
  // changes the page if it's success full after getting the OTP
  const reqOTP = (form: PhoneForm) =>
    dispatch(
      requestOTP({
        phoneNo: form.identification,
        onSuccess: () => setPageState({ showPhone: false }),
        registering: true,
      }) as any,
    );
  // verfies the OTP and changes the page location
  const reqAuth = (form: OTPFormState) => {
    dispatch(
      confirmOTP({
        otp: parseInt(form.otp),
        registering: true,
        onSuccess: () => console.log(`change the route`),
      }) as any,
    );}
  return (
    <>
      <SignUpForm
        showPhone={pageState.showPhone}
        loading={useSelector(authSelector).loading}
        error={useSelector(authSelector).error}
        phoneSubmit={reqOTP}
        OTPSubmit={reqAuth}
      />
    </>
  );
}
