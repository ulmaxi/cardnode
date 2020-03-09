import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import LayoutSideBar from '../side-bar';

export default function LargeScreenDrawer({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      <Drawer variant="permanent">
        <LayoutSideBar routes={[]} />
      </Drawer>
    </>
  );
}
