import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "@reach/router";
import React from 'react';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import './toolbar.scss';

const logo = process.env.PUBLIC_URL + '/images/card_node_logo.png';

interface MobileBarProp {
  barClass?: string;
  children?: any;
}

export default function MobileBar({ barClass, children }: MobileBarProp) {
  const {getState  } = useStore<RootState>();
  return (
    <>
      <AppBar
        style={{ backgroundColor: 'purple' }}
        variant="elevation"
        position={'sticky'}
      >
        <Toolbar className={barClass ?? 'app-toolbar'} variant="regular">
          <div className={'bar-items'}>{children}</div>
          <Link to={getState().authReducer.authorized ? '/dashboard' : '/'}>
            <img src={logo} width={'128px'} alt={'ulmax cardnode logo'} />
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
