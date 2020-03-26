import { createSlice } from '@reduxjs/toolkit';
import { AuthorizedEntity, AuthorizeResponse } from '@ulmax/frontend';
import { StoreAction } from 'src/store';

/**
 * Authorization Store State
 */
export interface AuthStore {
  otp?: AuthorizeResponse
  authorized?: AuthorizedEntity;
  error?: string;
  loading: boolean;
}

const initialState: AuthStore = { loading: false };

const authSlice = createSlice({
  name: 'authorization',
  initialState: initialState,
  reducers: {
    loading: (state) => ({ ...state, loading: true }),
    otp: (state, { payload }: StoreAction<AuthorizeResponse>) => ({
      ...state,
      otp: payload,
      loading: false,
    }),
    logout: () => initialState,
    error: (state, { payload }: StoreAction<string | undefined>) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    success: (
      state: AuthStore,
      { payload }: StoreAction<AuthorizedEntity>,
    ) => ({
      ...state,
      authorized: payload,
      loading: false,
    }),
  },
});

export const AuthActions = authSlice.actions;

export default authSlice.reducer;
