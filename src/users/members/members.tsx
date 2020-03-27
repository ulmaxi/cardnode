import { UlmaxCardLevel } from '@ulmax/frontend';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './members.scss';

export interface MemberDetails {
  cardId: string;
  fullName: string;
  accesslevel: UlmaxCardLevel;
}

export interface MemberListProp {
  onClick?: (member: MemberDetails) => any;
  members: MemberDetails[];
}

interface MemberRowProp {
  member: MemberDetails;
  index: number;
}

const MemberRow = ({ index, member }: MemberRowProp) => (
  <div
    className="members-list-row"
    style={{
      backgroundColor: index % 2 === 0 ? 'rgb(200, 200, 200)' : 'white',
    }}
  >
    <Typography variant="body1"> {index + 1} </Typography>
    <Typography variant="body1">{member.fullName.toUpperCase()}</Typography>
    <Typography variant="body1">{member.accesslevel.toUpperCase()}</Typography>
  </div>
);

function MemberList({ members, onClick }: MemberListProp) {
  return (
    <>
      <div className="members-list">
        <div className="members-list-headers">
          <Typography variant="h5">
            Members
          </Typography>
        </div>
        <div className="table-contents">
          {members.map((m, i) => (
            <MemberRow key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MemberList;
