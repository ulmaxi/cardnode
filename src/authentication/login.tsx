import { navigate } from '@reach/router';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { AuthorizedEntity } from '@ulmax/frontend';
import { useDidMount } from 'beautiful-react-hooks';
import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { RootState, Dispatcher } from 'src/store';
import { toastSuccess, toastInfo } from 'src/toast';
import { retrivePrincipalCard } from 'src/users/store/users-effect';
import LoginForm from './components/login-form';
import { OTPFormState } from './components/otp';
import { PhoneForm } from './components/phone-no';
import './components/styles.scss';
import { confirmOTP, requestOTP } from './store/auth-effects';
import { authSelector } from './store/auth-selectors';

interface LoginPageState {
  showPhone: boolean;
}

type LoginPageSetter = (state: LoginPageState) => any;

/**
 * selects the authorized user authorization information
 */
const authorization = (state: RootState) => state.authReducer.authorized?.data;
const hasUserCard = (state: RootState) =>
  Object.keys(state.userReducer.members).length > 0;

const navigateAuthorized = (state: RootState) => {
  if (authorization(state) && hasUserCard(state)) {
    navigate('/dashboard');
  }
};

const reqOTP = (
  dispatch: Dispatcher,
  setPageState: LoginPageSetter,
) => (form: PhoneForm) =>
  dispatch(
    requestOTP({
      phoneNo: form.identification,
      onSuccess() {
        toastSuccess(`OTP code has been sent to your identification phoneNo`);
        setPageState({ showPhone: false });
      },
      registering: false,
    }),
  );
// verfies the OTP and changes the page location
const reqAuth = (dispatch: Dispatcher) => (form: OTPFormState) =>
  dispatch(
    confirmOTP({
      otp: Number(form.otp),
      registering: false,
      onSuccess({ data }) {
        toastSuccess(`successfully Authenticated ${data.identification}`);
        getCard(dispatch)();
      },
    }),
  );

// changes the page if it's success full after getting the OTP

const getCard = (dispatch: Dispatcher) => () => {
  toastInfo(`loading user card details`);
  dispatch(
    retrivePrincipalCard({
      onSuccess({ biodata }) {
        toastSuccess(`successfully Authenticate ${biodata.firstname}`);
        navigate('/dashboard');
      },
    }),
  );
};

export default function SignInSide({}: RouterPath) {
  const { dispatch, getState } = useStore<RootState>();
  // manages the page state to show either OTP or Phone Input
  const [pageState, setPageState] = useState<LoginPageState>({
    showPhone: true,
  });
  useDidMount(() => {
    navigateAuthorized(getState());
  });
  return (
    <>
      <LoginForm
        showPhone={pageState.showPhone}
        loading={useSelector(authSelector).loading}
        error={useSelector(authSelector).error}
        phoneSubmit={reqOTP(dispatch as any, setPageState)}
        OTPSubmit={reqAuth(dispatch as any)}
      />
    </>
  );
}
