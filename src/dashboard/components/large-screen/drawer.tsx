import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import logo from 'src/ulmax-branding.png';

export default function LargeScreenDrawer({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      <Drawer variant="permanent">
        <div className={className}>
          className="drawer"
          <div>
            <img src={logo} />
          </div>
          <div className="bg-break"></div>
          <span>Yaweh</span>
        </div>
      </Drawer>
    </>
  );
}
