import { navigate } from '@reach/router';
import { UlmaxCardLevel, PersonalBiodata } from '@ulmax/frontend';
import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileEditor, { ProfileEditorState, formatProfileErrorToString } from './components/profile-editor';
import { requestPrincipalCard } from './store/users-effect';
import { toastSuccess, toastError } from 'src/toast';

type UpsertBiodataProp = {} & RouterPath;

/**
 * saves the biodata of a person or creates a new one
 */
export default function CreatePrincipalBiodata({}: UpsertBiodataProp) {
  const { dispatch, getState } = useStore<RootState>();
  const formData: Partial<ProfileEditorState> = {
    accessLevel: {
      identification:
        getState().authReducer.authorized?.data.identification || '',
      level: UlmaxCardLevel.Admin,
    },
  };
  const onSubmit = ({
    accessLevel,
    communalBiodata,
    biodata,
  }: ProfileEditorState) => {
    dispatch(
      requestPrincipalCard({
        biodatas: {
          identification: accessLevel?.identification,
          biodata,
          communaldata: communalBiodata,
        },
        onSuccess({ biodata }) {
          const { firstname, lastname  } = biodata as PersonalBiodata;
          toastSuccess(`${firstname} ${lastname} card is successfully created`);
          navigate('/dashboard');
        },
        onError(err) {
          toastError(formatProfileErrorToString(err).toString());
        }
      }) as any,
    );
  };
  return (
    <>
      <div>
        <ProfileEditor
          loading={getState().userReducer.loading}
          error={getState().userReducer.error}
          value={formData}
          onSubmit={onSubmit}
          editable={true}
        />
      </div>
    </>
  );
}
