import { AuthorizedEntity, AuthorizeRequest, AuthorizeResponse, ValidateAuthorizationReq } from '@ulmax/frontend';
import Fetch from 'src/fetch';
import { Dispatcher, ThunkedAction } from 'src/store';
import { awaitTo, LocalStatusAction, localStatusAction } from 'src/util';
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
const dispatchError = (dispatch: Dispatcher) => (err: Error | string) => {
  const message = typeof error === 'string' ? error : (err as Error).message;
  dispatch(error(message));
  setTimeout(() => {
    dispatch(error());
  }, ERROR_TIMEOUT);
};

type RequestOTPOptions = {
  phoneNo: string;
  registering?: boolean;
} & LocalStatusAction<AuthorizeResponse>;

/**
 * request OTP for the client
 */
export function requestOTP({
  phoneNo,
  onError,
  onSuccess,
  registering,
}: RequestOTPOptions): ThunkedAction {
  return async function(dispatch) {
    const [res, error] = await awaitTo(
      Fetch.POST<AuthorizeResponse, Partial<AuthorizeRequest>>(
        `auth/client/${registering ? 'signup' : 'login'}`,
        {
          identification: phoneNo,
        },
      ),
    );
    dispatch(loading());
    localStatusAction([res, error], { onSuccess, onError });
    localStatusAction([res, error], {
      onSuccess: val => dispatch(otp(val)),
      onError: error => dispatchError(dispatch)(error),
    });
  };
}

/**
 * options for confirming the otp
 */
type ConfirmOTPOptions = Omit<ValidateAuthorizationReq, 'id'> &
  LocalStatusAction<AuthorizedEntity>;

/**
 * confirms the OTP code and saves the authorized Entity
 */
export function confirmOTP({
  otp,
  registering,
  onError,
  onSuccess,
}: ConfirmOTPOptions): ThunkedAction {
  return async function(dispatch, getState) {
    const [res, error] = await awaitTo(
      Fetch.GET<AuthorizedEntity, ValidateAuthorizationReq>(
        `auth/otpvalidate`,
        {
          id: getState().authReducer.otp?.loginId ?? '',
          otp,
          registering,
        },
      ),
    );
    dispatch(loading());
    localStatusAction([res, error], { onSuccess, onError });
    localStatusAction([res, error], {
      onSuccess: val => dispatch(success(val)),
      onError: error => dispatchError(dispatch)(error),
    });
  };
}
