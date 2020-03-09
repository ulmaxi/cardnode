import React from 'react';
import Drawer from './large-screen/drawer';
import MenuBar from './large-screen/menubar';
import ToolBar from './large-screen/toolbar';
import './styles.scss';

export default function LargeDashboardLayout({ children }: ParentProp) {
  return (
    <>
      <div className="row">
        <Drawer className="drawer" />
        <div className="main">
            <ToolBar barClass="toolbar" />
            <MenuBar  menuClass="menu-bar" />
            <div className="layout-items">
            { children }
            </div>
        </div>
      </div>
    </>
  );
}
