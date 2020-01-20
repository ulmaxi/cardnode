import React from 'react';
import Drawer from './large-screen/drawer';
import MenuBar from './large-screen/menubar';
import ToolBar from './large-screen/toolbar';

export default function LargeDashboardLayout({ children }: ParentProp) {
  return (
    <>
      <div className="row">
        <Drawer className="drawer" />
        <div className="main">
            <ToolBar barClass="toolbar" />
            <MenuBar  menuClass="menu-bar" />
            { children }
        </div>
      </div>
    </>
  );
}
