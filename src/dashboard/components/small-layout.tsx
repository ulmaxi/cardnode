import React from 'react';
import Drawer from './small-screen/drawer';
import ToolBar from './small-screen/toolbar';

export default function SmallDashboardLayout({ children }: ParentProp) {
  return (
    <>
      <div className="row">
        <Drawer className="drawer" />
        <ToolBar barClass="toolbar" />
        <div className="content">
        { children }
        </div>
      </div>
    </>
  );
}
