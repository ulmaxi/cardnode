import { UlmaxCardLevel } from '@ulmax/frontend';
import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileEditor, { ProfileEditorState } from './components/profile-editor';
import { requestPrincipalCard } from './store/users-effect';

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
