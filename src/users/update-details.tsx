import React from 'react';
import { useStore } from 'react-redux';
import { RootState, Dispatcher } from 'src/store';
import ProfileEditor, {
  ProfileEditorState,
  formatProfileErrorToString,
} from './components/profile-editor';
import { updateCardMember } from './store/users-effect';

import { navigate } from '@reach/router';
import { PersonalBiodata } from '@ulmax/frontend';
import { toastSuccess, toastError } from 'src/toast';

type UpsertBiodataProp = { biodataId?: string } & RouterPath;

const onSubmit = (dispatch: Dispatcher, id: string) => ({
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
      onSuccess({ biodata }) {
        const { firstname, lastname } = biodata as PersonalBiodata;
        toastSuccess(`${firstname} ${lastname} card is successfully created`);
        navigate('/dashboard/members');
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
export default function UpdateMemberDetails({ biodataId }: UpsertBiodataProp) {
  const { dispatch, getState } = useStore<RootState>();
  const id = `${biodataId}`;
  const formData = getState().userReducer.members[id];

  return (
    <>
      <div>
        <ProfileEditor
          loading={getState().userReducer.loading}
          error={getState().userReducer.error}
          value={formData}
          onSubmit={onSubmit(dispatch as any, id)}
          editable={true}
        />
      </div>
    </>
  );
}
