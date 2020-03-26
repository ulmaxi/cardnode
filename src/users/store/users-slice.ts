import { createSlice } from '@reduxjs/toolkit';
import { UlmaxFullCard } from '@ulmax/frontend';
import { StoreAction } from 'src/store';

/**
 * Card Members Store State
 */
export type UserStore = {
  members: Map<string, UlmaxFullCard>;
  loading: boolean;
  error?: string;
};

const initialState: UserStore = {
  members: new Map(),
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    batchUpsertMember: (state, { payload }: StoreAction<UlmaxFullCard[]>) => {
      payload.forEach(member => {
        state.members.set(member.card.id, member);
      });
      state.loading = false;
      return state;
    },
    upsertMember: (state, { payload }: StoreAction<UlmaxFullCard>) => {
      state.members.set(payload.card.id, payload);
      state.loading = false;
      return state;
    },
    removeMember: (state, { payload }: StoreAction<string>) => {
      state.members.delete(payload);
      state.loading = false;
      return state;
    },
    error: (state, { payload }: StoreAction<string | undefined>) => {
      state.error = payload;
      state.loading = false;
      return state;
    },
    loading: state => {
      state.loading = true;
      return state;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
