import { createSlice } from '@reduxjs/toolkit';
import { UlmaxFullCard, SavedBiodataErrors } from '@ulmax/frontend';
import { StoreAction } from 'src/store';
import { produce } from 'immer';

/**
 * Card Members Store State
 */
export type UserStore = {
  members: Record<string, UlmaxFullCard>;
  loading: boolean;
  error?: Partial<SavedBiodataErrors> | string;
};

export type UpsertBiodataError = SavedBiodataErrors | string;

const initialState: UserStore = {
  members: {},
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    batchUpsertMember (state, { payload }: StoreAction<UlmaxFullCard[]>) {
      return produce(state, (draft) => {
        payload.forEach(member => {
          draft.members[member.card.id] = member;
        });
        draft.loading = false;
        return draft;
      })
    },
    upsertMember (state, { payload }: StoreAction<UlmaxFullCard>) {
      return produce(state, (draft) => {
        draft.members[payload.card.id] = payload;
        draft.loading = false;
        return draft;
      });
    },
    removeMember (state, { payload }: StoreAction<string>)  {
      return produce(state, (draft) => {
        delete draft.members[payload];
        draft.loading = false;
        return draft;
      })
    },
    error (state, { payload }: StoreAction<UpsertBiodataError | undefined>) {
      return produce(state, draft => {
        draft.error = payload;
        draft.loading = false;
        return draft;
      })
    },
    loading (state) {
      return produce(state, draft => {
        draft.loading = true;
        return draft;
      })
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
