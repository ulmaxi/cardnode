import { navigate } from '@reach/router';
import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileEditor, { ProfileEditorState } from './components/profile-editor';
import { addCardMember } from './store/users-effect';

type AddMemberBiodataProp = {} & RouterPath;

/**
 * saves the biodata of a person or creates a new one
 */
export default function AddMemberDetails({}: AddMemberBiodataProp) {
  const { dispatch, getState } = useStore<RootState>();
  const onSubmit = ({
    accessLevel,
    communalBiodata,
    biodata,
  }: ProfileEditorState) => {
    dispatch(
      addCardMember({
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
          value={{}}
          onSubmit={onSubmit}
          editable={true}
        />
      </div>
    </>
  );
}
