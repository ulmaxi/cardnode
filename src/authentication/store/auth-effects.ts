import { AuthorizedEntity, AuthorizeRequest, AuthorizeResponse, ValidateAuthorizationReq } from '@ulmax/frontend';
import fetch from 'cross-fetch';
import { ApiPath, fetchToJson } from 'src/api';
import { Dispatcher, ThunkedAction } from 'src/store';
import { otpStateSelector } from './auth-selectors';
import { AuthActions } from './auth-slice';

/**
 * time for error to be cleared
 * from the store
 */
const ERROR_TIMEOUT = 3000;

const { error, otp, success, loading } = AuthActions;

/**
 * dispatch the store of the error
 */
const dispatchError = (dispatch: Dispatcher) => (err: Error) => {
  dispatch(error(err.message));
  setTimeout(() => {
    dispatch(error());
  }, ERROR_TIMEOUT);
};

/**
 * request OTP for the client
 */
export function requestOTP(
  phoneNo: string,
  registering = false,
): ThunkedAction {
  return async function(dispatch) {
    try {
      const path = ApiPath(
        `api/internal/security/client/auth/institution/${
          registering ? 'signup' : 'login'
        }`,
      );
      const body = JSON.stringify({
        identification: phoneNo,
      } as AuthorizeRequest);
      dispatch(loading());
      console.log(body);
      const res = await fetchToJson<AuthorizeResponse>(
        await fetch(path, {
          body,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
      dispatch(otp(res));
    } catch (err) {
      dispatchError(dispatch)(err);
    }
  };
}

/**
 * confirms the OTP code and saves the authorized Entity
 */
export function confirmOTP({
  otp,
  registering,
}: Omit<ValidateAuthorizationReq, 'id'>): ThunkedAction {
  return async function(dispatch, getState) {
    try {
      dispatch(loading());
      const state = otpStateSelector(getState());
      const path = ApiPath('api/internal/security/client/auth/otpvalidate');
      const body = JSON.stringify({
        id: state?.login?.loginId,
        otp,
        registering,
      } as ValidateAuthorizationReq);
      const auth = await fetchToJson<AuthorizedEntity>(
        await fetch(path, {
          body,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
      dispatch(success(auth));
    } catch (err) {
      dispatchError(dispatch)(err);
    }
  };
}
