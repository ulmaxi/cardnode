import { Card } from '@material-ui/core';
import AppBar from 'src/dashboard/components/layout/toolbar';

import React from 'react';
import logo from 'src/ulmax-branding.png';
import ProfileEditor from 'src/users/profile-editor';
import './components/styles.scss';

const Profiler = <ProfileEditor />;

export default function Registration({ children }: RouterPath) {
  return (
    <div className="registration-bg">
      <AppBar>
          <h5> Register </h5>
      </AppBar>
      <Card>{children}</Card>
      {/* <div className="registration-content">
                        <div className="profile-editor">
                        </div>
            </div> */}
    </div>
  );
}
