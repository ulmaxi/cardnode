import { CssBaseline } from '@material-ui/core';
import { UlmaxCardLevel } from '@ulmax/frontend';
import React from 'react';
import DrugPrescription from 'src/prescriptions/prescription';
import ProfileCard from 'src/users/components/profile-card';
import MemberList, { MemberDetails } from 'src/users/members/members';
import LargeDashboardLayout from './components/large-layout';
import SmallDashboardLayout from './components/small-layout';
import './components/styles.scss';
import WardCard from './components/ward-card/ward-card';

type DashboardProp = {
  path?: any;
  children?: any;
};

const Layout = ({ children }: ParentProp) => (
  <>
    <div className="column">
      <div className="hide-small-screen">
        <LargeDashboardLayout children={children} />
      </div>
      <div className="hide-large-screen">
        <SmallDashboardLayout children={children} />
      </div>
    </div>
  </>
);

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

function DashBoardItems() {
  return <>
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
}

export default function Dashboard({}: DashboardProp) {
  return (
    <>
      <div className="dashboard">
        <CssBaseline />
        <Layout>
          <DrugPrescription />
        </Layout>
      </div>
    </>
  );
}
