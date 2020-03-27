import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';
import './ward-card.scss';

type WardCardProp = {
  cardNo: string;
};

export default function WardCard({ cardNo }: WardCardProp) {
  return (
    <>
      <Card>
        <div className="ward-card">
          <div className="card-details">
            <div className="card-number">
              <Typography variant="h5">{cardNo.toUpperCase()}</Typography>
            </div>
            <div className="card-icon">opp</div>
          </div>
        </div>
      </Card>
    </>
  );
}
