import React, { useState } from 'react';
import Drawer from './small-screen/drawer';
import ToolBar from './small-screen/toolbar';

interface DashBoardState {
  menu: boolean;
}

export default function SmallDashboardLayout({ children }: ParentProp) {
  const [state, setState] = useState<DashBoardState>({ menu: false });
  const menuToggle = () => setState({...state, menu: !state.menu });
  return (
    <>
      <div onClick={ () => state.menu ? menuToggle() : '' } className="row">
        <Drawer menu={state.menu} />
        <ToolBar toggleMenu={menuToggle} barClass="toolbar" />
        <div  className="content">
        { children }
        </div>
      </div>
    </>
  );
}
