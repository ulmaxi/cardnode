import { createSlice } from '@reduxjs/toolkit';
import { ConsultatedDrug, FindQueryParams } from '@ulmax/frontend';
import { StoreAction } from 'src/store';

export interface LocalPrescriptionQuery extends FindQueryParams {
  limit: number;
  skip: number;
}

/**
 * The inteface for updating prescription
 * update
 */
export type PrescriptionUpdate = {
  cardId: string;
  prescriptions: ConsultatedDrug[];
  query: LocalPrescriptionQuery;
};

/**
 * interface for the actual menber prescription
 * stored
 */
export type StoredMemberPrescription = Omit<PrescriptionUpdate, 'cardId'>;

/**
 * Card Members Store State
 */
export type prescriptionStore = {
  prescriptions: Record<string, StoredMemberPrescription>;
  loading: boolean;
  error?: string;
};

const initialState: prescriptionStore = {
  prescriptions: {},
  loading: false,
};

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState: initialState,
  reducers: {
    updatePrescriptions: (
      state,
      { payload }: StoreAction<PrescriptionUpdate>,
    ) => {
      const { cardId, query, prescriptions } = payload;
      if (state.prescriptions.hasOwnProperty(cardId)) {
        const preloaded = state.prescriptions[cardId];
        state.prescriptions[cardId] = {
          query,
          prescriptions: [
            ...(preloaded ? preloaded.prescriptions : []),
            ...prescriptions,
          ],
        };
        return state;
      }
      state.prescriptions[cardId] = {
        query,
        prescriptions: prescriptions,
      };
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

export const prescriptionActions = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
