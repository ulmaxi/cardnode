import { navigate } from '@reach/router';
import { PersonalBiodata } from '@ulmax/frontend';
import React from 'react';
import { useStore } from 'react-redux';
import { Dispatcher, RootState } from 'src/store';
import { toastError, toastSuccess } from 'src/toast';
import ProfileEditor, { formatProfileErrorToString, ProfileEditorState } from './components/profile-editor';
import { addCardMember } from './store/users-effect';

type AddMemberBiodataProp = {} & RouterPath;

const onSubmit = (dispatch: Dispatcher) => ({
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
      onSuccess({ biodata }) {
        const { firstname, lastname } = biodata as PersonalBiodata;
        toastSuccess(`${firstname} ${lastname} card is successfully created`);
        navigate('/dashboard/members');
      },
      onError(err) {
        toastError(formatProfileErrorToString(err).toString());
      },
    }),
  );
};

/**
 * saves the biodata of a person or creates a new one
 */
export default function AddMemberDetails({}: AddMemberBiodataProp) {
  const { dispatch, getState } = useStore<RootState>();

  return (
    <>
      <div>
        <ProfileEditor
          loading={getState().userReducer.loading}
          error={getState().userReducer.error}
          value={{}}
          onSubmit={onSubmit(dispatch as any)}
          editable={true}
        />
      </div>
    </>
  );
}
