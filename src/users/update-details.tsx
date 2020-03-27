import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileEditor, { ProfileEditorState } from './components/profile-editor';
import { updateCardMember } from './store/users-effect';

import { navigate } from '@reach/router';

type UpsertBiodataProp = { biodataId?: string } & RouterPath;

/**
 * saves the biodata of a person or creates a new one
 */
export default function UpdateMemberDetails({biodataId}: UpsertBiodataProp) {
  const { dispatch, getState } = useStore<RootState>();
  const id = `${biodataId}`;
  const formData = getState().userReducer.members[id];
  const onSubmit = ({
    accessLevel,
    communalBiodata,
    biodata,
  }: ProfileEditorState) => {
    dispatch(
      updateCardMember(id, {
        biodatas: {
          identification: accessLevel?.identification,
          biodata,
          communaldata: communalBiodata,
        },
        onSuccess(card) {
          navigate('/dashboard/members');
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
