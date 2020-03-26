import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

/**
 * selects the OTP state from the store
 */
export const authSelector = (state: RootState) => state.authReducer;