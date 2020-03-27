import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import LayoutSideBar, { DashboardDrawerLink } from './side-bar';

const routes:  DashboardDrawerLink[] = [
{
  link: 'members',
  title: 'Members'
},
{
  link: 'prescriptions',
  title: 'Prescriptions'
},
{
  link: 'emergency',
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
