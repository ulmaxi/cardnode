import React from 'react';
import { CssBaseline } from '@material-ui/core';
import DashboardLayout from './components/layout/layout';
// import DrugPrescription from 'src/prescriptions/prescription';


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
          {/* <DrugPrescription /> */}
        </Layout>
      </div>
    </>
  );
}
