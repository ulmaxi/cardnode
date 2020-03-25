import React from 'react';
import { UlmaxCardLevel } from '@ulmax/frontend';
import ProfileCard from 'src/users/components/profile-card';
import MemberList, { MemberDetails } from 'src/users/members/members';
import WardCard from './ward-card/ward-card';
import './home-board.scss';

const members: MemberDetails[] = [
  {
    accesslevel: UlmaxCardLevel.Admin,
    fullName: 'Abiodun Oyegoke',
    cardId: '222333',
  },
  {
    accesslevel: UlmaxCardLevel.Minor,
    fullName: 'Abiodun Oluwaseun',
    cardId: '2s2423',
  },
];

function DashBoardItems({}: RouterPath) {
  return (
    <>
      <div className="information">
        <div className="card">
          <ProfileCard />
        </div>
        <div className="card">
          <WardCard />
        </div>
      </div>
      <div className="member-list">
        <MemberList members={members} />
      </div>
    </>
  );
}

export default DashBoardItems;
