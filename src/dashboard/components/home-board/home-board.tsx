import { navigate } from '@reach/router';
import { Authorization, PersonalBiodata, UlmaxFullCard } from '@ulmax/frontend';
import React, { Dispatch } from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ProfileCard from 'src/users/components/profile-card';
import MemberList, { MemberDetails } from 'src/users/members/members';
import './home-board.scss';
import WardCard from './ward-card/ward-card';
import { retriveCardMembers } from 'src/users/store/users-effect';
import { toastSuccess, toastError } from 'src/toast';
import { AnyAction } from 'redux';
import { useWillUnmount } from 'beautiful-react-hooks';

/**
 * retrieves all the members full cards
 */
const getMembersFullCard = (state: RootState) =>
  Object.values(state.userReducer.members);

/**
 * selects the authorized user authorization information
 */
const authorization = (state: RootState) => state.authReducer.authorized?.data;

/**
 * gets the current authorized user's own card
 */
const authorizedUserCard = (auth: Authorization, cards: UlmaxFullCard[]) => {
  const authUserCardIndex = cards.findIndex(
    ({ card }) => card.trackId === auth.trackId,
  );
  return cards[authUserCardIndex];
};

/**
 * gets the current card No
 */
const getBasicCardInfo = (state: RootState) => {
  const authData = authorization(state);
  if (authData) {
    const { card, biodata } = authorizedUserCard(
      authData,
      getMembersFullCard(state),
    );
    const { firstname, lastname } = biodata as PersonalBiodata;
    return {
      cardNo: card.cardNo,
      fullName: `${firstname} ${lastname}`,
    };
  }
  return {
    cardNo: '',
    fullName: '',
  };
};

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

/**
 * retrives the card members from the server
 */
const getCardMembers = (dispatch: Dispatch<AnyAction>) => {
  dispatch(
    retriveCardMembers({
      onSuccess() {
        toastSuccess(`successfully retrive the card members`);
      },
      onError(err) {
        toastError(err);
      },
    }) as any,
  );
};

const navigateUnAuthorized = (state: RootState) => {
  if (!authorization(state)) {
    navigate('/');
  }
};

function DashBoardItems({}: RouterPath) {
  const { getState } = useStore<RootState>();
  navigateUnAuthorized(getState());
  const { fullName, cardNo } = getBasicCardInfo(getState());

  return (
    <>
      <div className="information">
        <div className="card">
          <ProfileCard fullname={fullName} />
        </div>
        <div className="card">
          <WardCard cardNo={cardNo} />
        </div>
      </div>
      <div className="member-list">
        <MemberList
          members={getMembersFullCard(getState()).map(memberDetailFromCard)}
        />
      </div>
    </>
  );
}

export default DashBoardItems;
