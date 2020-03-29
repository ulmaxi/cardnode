import { navigate } from '@reach/router';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { AuthorizedEntity } from '@ulmax/frontend';
import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { RootState } from 'src/store';
import { toastError, toastSuccess } from 'src/toast';
import { OTPFormState } from './components/otp';
import { PhoneForm } from './components/phone-no';
import SignUpForm from './components/signup-form';
import './components/styles.scss';
import { confirmOTP, requestOTP } from './store/auth-effects';
import { authSelector } from './store/auth-selectors';

/**
 * state structure for signup page
 */
interface SignUpPageState {
  showPhone: boolean;
}

type SignUpPageStateSetter = (state: SignUpPageState) => any;

// changes the page if it's success full after getting the OTP
const reqOTP = (
  dispatch: Dispatch<AnyAction>,
  setPageState: SignUpPageStateSetter,
) => (form: PhoneForm) =>
  dispatch(
    requestOTP({
      phoneNo: form.identification,
      onSuccess() {
        setPageState({ showPhone: false });
        toastSuccess(
          `confirm Identification with OTP code sent to your identification No`,
        );
      },
      onError(err) {
        toastError(err);
      },
      registering: true,
    }) as any,
  );

// verfies the OTP and changes the page location
const reqAuth = (dispatch: Dispatch<AnyAction>) => (form: OTPFormState) => {
  dispatch(
    confirmOTP({
      otp: parseInt(form.otp),
      registering: true,
      onSuccess(auth: AuthorizedEntity) {
        toastSuccess(`Signup identification is successfully confirmed`);
        navigate(`/register/profile/${auth.data.trackId}`);
      },
      onError(err) {
        toastError(err);
      },
    }) as any,
  );
};

/**
 * The main SignUp page to join cardnode
 */
export default function SignUpPage({ children }: RouterPath) {
  const { dispatch, getState } = useStore<RootState>();
  // manages the page state to show either OTP or Phone Input
  const [pageState, setPageState] = useState<SignUpPageState>({
    showPhone: true,
  });

  return (
    <>
      <SignUpForm
        showPhone={pageState.showPhone}
        loading={useSelector(authSelector).loading}
        error={useSelector(authSelector).error}
        phoneSubmit={reqOTP(dispatch, setPageState)}
        OTPSubmit={reqAuth(dispatch)}
      />
    </>
  );
}
