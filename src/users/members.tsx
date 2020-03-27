import Link from '@material-ui/core/Link';
import React from 'react';
// import { Link } from "@reach/router";

import MemberList, { MemberDetails } from './members/members';
import { RootState } from 'src/store';
import { UlmaxFullCard, PersonalBiodata } from '@ulmax/frontend';
import { useStore } from 'react-redux';

/**
 * retrieves all the members full cards
 */
const getMembers = (state: RootState) =>
Object.values(state.userReducer.members).map(memberDetailFromCard);

/**
 * converts a full card to minimal display
 */
const memberDetailFromCard = ({ biodata, card }: UlmaxFullCard) => {
  const { firstname, lastname } = biodata as PersonalBiodata;
  return {
    accesslevel: card.level,
    fullName: `${firstname} ${lastname}`,
    cardId: card.id,
  } as MemberDetails;
};


function MemberManager({}: RouterPath) {
  const { getState } = useStore<RootState>();
  const members = getMembers(getState());
  return (
    <>
      <div className="members-page">
        <Link variant="button" href="add-member">
          {' '}
          Add Member{' '}
        </Link>
        <MemberList members={members} />
      </div>
    </>
  );
}

export default MemberManager;
