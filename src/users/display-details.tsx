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


  type DisplayBiodataDetailsProp = {
    biodataId?: string
  } & RouterPath;

/**
 * displays a person's biodata
 */
export default function DisplayBiodataDetails({ biodataId }: DisplayBiodataDetailsProp) {
  const { getState } = useStore<RootState>();
  const formData = mapFullToFormState(
    getState().userReducer.members[`${biodataId}`]);
  return (
    <>
      <div>
        <ProfileEditor value={formData} editable={false} />
      </div>
    </>
  );
}

