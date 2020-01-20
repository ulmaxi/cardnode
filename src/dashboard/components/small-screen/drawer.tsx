import Drawer from '@material-ui/core/Drawer';
import React from 'react';

export default function MobileDrawer({ className }: { className?: string }) {
  return (
    <>
      <Drawer >
        <div className={className }>i am the mobile drawer</div>
      </Drawer>
    </>
  );
}
