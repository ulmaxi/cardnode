import { navigate } from '@reach/router';
import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileEditor, { ProfileEditorState, formatProfileErrorToString } from './components/profile-editor';
import { addCardMember } from './store/users-effect';
import { toastSuccess, toastError } from 'src/toast';
import { UlmaxFullCard, PersonalBiodata } from '@ulmax/frontend';

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
    console.log({
      accessLevel,
      communalBiodata,
      biodata,
    });
    dispatch(
      addCardMember({
        biodatas: {
          identification: accessLevel?.identification,
          biodata,
          communaldata: communalBiodata,
        },
        onSuccess({ biodata }) {
          const { firstname, lastname  } = biodata as PersonalBiodata;
          toastSuccess(`${firstname} ${lastname} card is successfully created`);
          navigate('/dashboard/members');
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
          value={{}}
          onSubmit={onSubmit}
          editable={true}
        />
      </div>
    </>
  );
}
