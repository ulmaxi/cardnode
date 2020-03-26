import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import LayoutSideBar, { DashboardDrawerLink} from './side-bar';

const routes:  DashboardDrawerLink[] = [
{
  link: '/dashboard/members',
  title: 'Members'
},
{
  link: '/dashboard/prescriptions',
  title: 'Prescriptions'
},
{
  link: '/dashboard/emergency',
  title: 'Emergency'
},
// {
//   link: '/dashboard/followup',
//   title: 'FollowUp'
// },
]

export default function MobileDrawer({ menu }: { menu?: boolean }) {
  return (
    <>
      <Drawer open={menu} variant="temporary" >
        <LayoutSideBar routes={routes} />
      </Drawer>
    </>
  );
}
