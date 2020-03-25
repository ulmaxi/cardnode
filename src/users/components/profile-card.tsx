import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';

const myimage = process.env.PUBLIC_URL + '/images/abiodun.jpg';
console.log(myimage);

export default function ProfileCard() {
  return (
    <>
      <Card className="profile-card-host">
        <div className="profile-card">
          <div className="card-image-box">
            <div className="card-image"></div>
          </div>
          <div className="data-container">
            <Typography variant="h4">Oyegoke Abiodun</Typography>
            <Typography variant="h6">2xyrs Male</Typography>
          </div>
        </div>
      </Card>
    </>
  );
}
