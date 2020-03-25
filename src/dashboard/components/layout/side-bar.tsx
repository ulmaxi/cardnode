import { Link } from "@reach/router";
import React from 'react';
const logo = process.env.PUBLIC_URL + '/images/card_node_logo.png';

/**
 * interface for the dashboard link
 */
export interface DashboardDrawerLink {
  title: string;
  link: string;
  icon?: React.Component;
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
          { routes.map((r, i) => <Link to={r.link} key={i}> { r?.icon} {r.title} </Link>) }
        </div>
      </div>
    </>
  );
}

export default LayoutSideBar;
