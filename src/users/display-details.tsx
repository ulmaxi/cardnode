import { UlmaxFullCard } from '@ulmax/frontend';
import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileEditor, { ProfileEditorState } from './components/profile-editor';


const mapFullToFormState = ({ card, communaldata, biodata }: UlmaxFullCard) =>
  ({
    biodata,
    communalBiodata: communaldata,
    accessLevel: {
      level: card.level,
    },
  } as ProfileEditorState);


/**
 * displays a person's biodata
 */
export default function DisplayBiodataDetails({}: RouterPath) {
  const { getState } = useStore<RootState>();
  const biodataId = '';
  const formData = mapFullToFormState(
    getState().userReducer.members.get(biodataId) as any,
  );
  return (
    <>
      <div>
        <ProfileEditor value={formData} editable={false} />
      </div>
    </>
  );
}

