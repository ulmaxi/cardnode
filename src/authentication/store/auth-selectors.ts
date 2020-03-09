import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

/**
 * selects the OTP state from the store
 */
export const authSelector = (state: RootState) => state.authReducer;

/**
 * selects the OTP state from the store
 */
export const otpStateSelector = createSelector(
  authSelector,
  store => store?.OTP,
);
