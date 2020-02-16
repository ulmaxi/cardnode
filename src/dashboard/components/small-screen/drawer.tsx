import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import LayoutSideBar from '../side-bar';

export default function MobileDrawer({ menu }: { menu?: boolean }) {
  return (
    <>
      <Drawer open={menu} variant="temporary" >
        <LayoutSideBar routes={[]} />
      </Drawer>
    </>
  );
}
