import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ProfileCard from 'src/users/components/profile-card';
import LargeDashboardLayout from './components/large-layout';
import SmallDashboardLayout from './components/small-layout';
import './components/styles.scss';

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

export default function Dashboard({}: DashboardProp) {
  return (
    <>
      <div className="dashboard">
        <CssBaseline />
        <Layout>
          <ProfileCard />
        </Layout>
      </div>
    </>
  );
}
