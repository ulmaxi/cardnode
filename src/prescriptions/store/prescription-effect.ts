import { ConsultatedDrug } from '@ulmax/frontend';
import Fetch from 'src/fetch';
import { ThunkedAction } from 'src/store';
import { awaitTo, LocalStatusAction, localStatusAction } from 'src/util';
import { LocalPrescriptionQuery, prescriptionActions } from './prescription-slice';

type RetrivePrescriptions = {
  cardId: string;
} & LocalStatusAction<ConsultatedDrug[]>;

/**
 * request to get all card members
 */
export function retrivePrescriptions({
  onError,
  onSuccess,
  cardId,
}: RetrivePrescriptions): ThunkedAction {
  return async function(dispatch, getState) {
    dispatch(prescriptionActions.loading());
    const prescriptionCheckpoint = getState().prescriptionReducer.prescriptions[
      cardId
    ];
    let query: LocalPrescriptionQuery = { limit: 10, skip: 0 };
    if (prescriptionCheckpoint) {
      query = {
        ...query,
        skip: prescriptionCheckpoint.query.skip + query.limit,
      };
    }
    const response = await awaitTo(
      Fetch.GET<ConsultatedDrug[]>(
        `cardnode/${getState()}/prescription/${cardId}`,
        query,
      ),
    );
    localStatusAction(response, {
      onSuccess: prescriptions =>
        dispatch(
          prescriptionActions.updatePrescriptions({
            prescriptions,
            query,
            cardId,
          }),
        ),
      onError: error => dispatch(prescriptionActions.error(error)),
    });
    localStatusAction(response, {
      onError,
      onSuccess,
    });
  };
}
