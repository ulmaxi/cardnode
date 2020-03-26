import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileEditor, { ProfileEditorState } from './components/profile-editor';
import { updateCardMember } from './store/users-effect';

type UpsertBiodataProp = {} & RouterPath;

/**
 * saves the biodata of a person or creates a new one
 */
export default function UpdateMemberDetails({}: UpsertBiodataProp) {
  const { dispatch, getState } = useStore<RootState>();
  const biodataId = '';
  const formData = getState().userReducer.members.get(biodataId);
  const onSubmit = ({
    accessLevel,
    communalBiodata,
    biodata,
  }: ProfileEditorState) => {
    dispatch(
      updateCardMember(biodataId, {
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
