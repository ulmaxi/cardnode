import { AuthorizedEntity, AuthorizeRequest, AuthorizeResponse, ValidateAuthorizationReq } from '@ulmax/frontend';
import Fetch from 'src/fetch';
import { dispatchError, ThunkedAction } from 'src/store';
import { awaitTo, LocalStatusAction, localStatusAction } from 'src/util';
import { AuthActions } from './auth-slice';


const { error, otp, success, loading } = AuthActions;

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
    const result = await awaitTo(
      Fetch.POST<AuthorizeResponse, Partial<AuthorizeRequest>>(
        `auth/client/${registering ? 'signup' : 'login'}`,
        {
          identification: phoneNo,
        },
      ),
    );
    dispatch(loading());
    localStatusAction(result, {
      onSuccess: val => dispatch(otp(val)),
      onError: err => dispatchError(dispatch, error)(err),
    });
    localStatusAction(result, { onSuccess, onError });
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
    const result = await awaitTo(
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
    localStatusAction(result, {
      onSuccess: val => dispatch(success(val)),
      onError: err => dispatchError(dispatch, error)(err),
    });
    localStatusAction(result, { onSuccess, onError });
  };
}
