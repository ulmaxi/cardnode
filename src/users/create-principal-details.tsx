import { navigate } from '@reach/router';
import { PersonalBiodata, UlmaxCardLevel } from '@ulmax/frontend';
import React from 'react';
import { useStore } from 'react-redux';
import { Dispatcher, RootState } from 'src/store';
import { toastError, toastSuccess } from 'src/toast';
import ProfileEditor, { formatProfileErrorToString, ProfileEditorState } from './components/profile-editor';
import { requestPrincipalCard } from './store/users-effect';

type UpsertBiodataProp = {} & RouterPath;

const onSubmit = (dispatch: Dispatcher, identification: string) => ({
  accessLevel,
  communalBiodata,
  biodata,
}: ProfileEditorState) => {
  dispatch(
    requestPrincipalCard({
      biodatas: {
        identification,
        biodata,
        communaldata: communalBiodata,
      },
      onSuccess({ biodata }) {
        const { firstname, lastname } = biodata as PersonalBiodata;
        toastSuccess(`${firstname} ${lastname} card is successfully created`);
        navigate('/dashboard');
      },
      onError(err) {
        toastError(formatProfileErrorToString(err).toString());
      },
    }) as any,
  );
};

/**
 * saves the biodata of a person or creates a new one
 */
export default function CreatePrincipalBiodata({}: UpsertBiodataProp) {
  const { dispatch, getState } = useStore<RootState>();
  const identification = getState().authReducer.authorized?.data.identification || '';
  const formData: Partial<ProfileEditorState> = {
    accessLevel: {
      identification,
      level: UlmaxCardLevel.Admin,
    },
  };
  return (
    <>
      <div>
        <ProfileEditor
          loading={getState().userReducer.loading}
          error={getState().userReducer.error}
          value={formData}
          onSubmit={onSubmit(dispatch as any, identification)}
          editable={true}
        />
      </div>
    </>
  );
}
