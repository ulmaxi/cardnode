import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import React from 'react';
import logo from 'src/ulmax-branding.png';
import { desktopDrawerLinks } from '../drawer-links';

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
          {desktopDrawerLinks.map(l => (
            <Link href={l.link}>
              {l.icon} <span> {l.title} </span>
            </Link>
          ))}
        </div>
      </Drawer>
    </>
  );
}
