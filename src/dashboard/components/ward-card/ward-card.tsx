import Card from '@material-ui/core/Card';
import React from 'react';
import './styles.scss';

export default function WardCard() {
  return (
    <>
      <Card>
        <div className="ward-card">
          <div className="card-details">
            <div className="card-number">12637163712367123</div>
            <div className="card-icon">opp</div>
          </div>
        </div>
      </Card>
    </>
  );
}
