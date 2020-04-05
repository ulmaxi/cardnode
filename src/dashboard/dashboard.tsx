import { CssBaseline } from '@material-ui/core';
import React from 'react';
import DashboardLayout from './components/layout/layout';


type DashboardProp = {
  path?: any;
  children?: any;
};

const Layout = ({ children }: ParentProp) => (
  <>
    <div className="column">
      <DashboardLayout children={children} />
    </div>
  </>
);

export default function Dashboard({children }: DashboardProp) {
  return (
    <>
      <div className="dashboard">
        <CssBaseline />
        <Layout>
          { children }
        </Layout>
      </div>
    </>
  );
}
