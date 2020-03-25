import React from 'react';
import SelectCardMembers from 'src/users/members/select-members';
import './components/styles.scss';
import Tablet from './components/tablet';

function DrugPrescription({}: RouterPath) {
  return (
    <>
      <div className="drug-container">
        <div className="members-select">
          <SelectCardMembers
            members={[]}
            onChange={event => console.log(event)}
          />
        </div>
        <div className="drugs-info">
          <div className="drug-details">
            <Tablet
              hopsital="life care hospital"
              owner="AWS Charges"
              prescriptions={[]}
              date={new Date()}
            />
          </div>
          <div className="drug-details">
            <Tablet
              hopsital="life care hospital"
              owner="AWS Charges"
              prescriptions={[]}
              date={new Date()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DrugPrescription;
