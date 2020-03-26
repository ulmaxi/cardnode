import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import './toolbar.scss';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';

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
          <Link href={getState().authReducer.authorized ? '/dashboard/home' : '/'}>
            <img src={logo} width={'128px'} alt={'ulmax cardnode logo'} />
          </Link>
          <div className={'bar-items'}>{children}</div>
        </Toolbar>
      </AppBar>
    </>
  );
}
