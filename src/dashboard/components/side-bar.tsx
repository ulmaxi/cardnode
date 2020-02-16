import { Link } from "@reach/router";
import React from 'react';
import logo from 'src/ulmax-branding.png';
import './styles.scss';

/**
 * interface for the dashboard link
 */
export interface DashboardDrawerLink {
  title: string;
  link: string;
  icon: React.Component;
}

interface LayoutSideBarProps {
  routes: DashboardDrawerLink[];
}

function LayoutSideBar({ routes }: LayoutSideBarProps) {
  return (
    <>
      <div className="layout-side-bar">
        <div className="sidebar-brand">
          <img src={logo} /> 
        </div>
        <div className="sidebar-spacer"></div>
        <div className="sidebar-routes">
          { routes.map(r => <Link to={r.link}> { r.icon} {r.title} </Link>) }
        </div>
      </div>
    </>
  );
}

export default LayoutSideBar;
