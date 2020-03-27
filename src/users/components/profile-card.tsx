import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';

// TODO change the image to letter Alphabet
const myimage = process.env.PUBLIC_URL + '/images/abiodun.jpg';
console.log(myimage);

type ProfileCardProp = {
  fullname: string;
};

export default function ProfileCard({ fullname }: ProfileCardProp) {
  return (
    <>
      <Card className="profile-card-host">
        <div className="profile-card">
          <div className="card-image-box">
            <div className="card-image"></div>
          </div>
          <div className="data-container">
            <Typography variant="h5">{fullname.toUpperCase()}</Typography>
          </div>
        </div>
      </Card>
    </>
  );
}
