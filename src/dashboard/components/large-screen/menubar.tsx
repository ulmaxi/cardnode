import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import React from 'react';

export default function DashboardMenuBar({ menuClass }: { menuClass?: string }) {
  return (
    <>
      <Card className={menuClass}>
        <div className="links">
          <Button> Home </Button>
          <Button> Prescriptions </Button>
        </div>
        <Button variant='contained' color='secondary'> Emergency </Button>
      </Card>
    </>
  );
}
