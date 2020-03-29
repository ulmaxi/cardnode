import { createSlice } from '@reduxjs/toolkit';
import { AuthorizedEntity, AuthorizeResponse } from '@ulmax/frontend';
import { produce } from 'immer';
import { StoreAction } from 'src/store';

/**
 * Authorization Store State
 */
export interface AuthStore {
  otp?: AuthorizeResponse;
  authorized?: AuthorizedEntity;
  error?: string;
  loading: boolean;
}

const initialState: AuthStore = { loading: false };

const authSlice = createSlice({
  name: 'authorization',
  initialState: initialState,
  reducers: {
    loading(state) {
      return produce(state, draft => {
        draft.loading = true;
        return draft;
      });
    },
    otp(state, { payload }: StoreAction<AuthorizeResponse>) {
      return produce(state, draft => {
        draft.otp = payload;
        draft.loading = false;
        return draft;
      });
    },
    logout() {
      return initialState;
    },
    error(state, { payload }: StoreAction<string | undefined>) {
      return produce(state, draft => {
        draft.error = payload;
        draft.loading = false;
        return draft;
      });
    },
    success(state: AuthStore, { payload }: StoreAction<AuthorizedEntity>) {
      return produce(state, draft => {
        draft.authorized = payload;
        draft.loading = false;
        return draft;
      });
    },
  },
});

export const AuthActions = authSlice.actions;

export default authSlice.reducer;
