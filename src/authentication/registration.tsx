import { Card } from '@material-ui/core';
import React from 'react';
import AppBar from 'src/dashboard/components/layout/toolbar';
import './components/styles.scss';

export default function Registration({ children }: RouterPath) {
  return (
    <div className="registration-bg">
      <AppBar>
          <h5> Register </h5>
      </AppBar>
      <Card>{children}</Card>
    </div>
  );
}
