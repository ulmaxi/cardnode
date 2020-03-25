import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './drawer';
import ToolBar from './toolbar';
import './layout.scss';

interface DashBoardState {
  menu: boolean;
}

export default function DashboardLayout({ children }: ParentProp) {
  const [state, setState] = useState<DashBoardState>({ menu: false });
  const menuToggle = () => setState({ ...state, menu: !state.menu });
  return (
    <>
      <div onClick={() => (state.menu ? menuToggle() : '')} className="column">
        <Drawer menu={state.menu} />
        <ToolBar >
          <TextField className="search-input-box" variant={'outlined'} label="Search" />
          <IconButton style={{color: 'white'}} onClick={() => menuToggle()}>
            <MenuIcon />
          </IconButton>
        </ToolBar>
        <div className="content"> {children}</div>
      </div>
    </>
  );
}
