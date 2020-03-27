import React, { useState } from 'react';
import SelectCardMembers from 'src/users/members/select-members';
import './components/styles.scss';
import Tablet from './components/tablet';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import { PersonalBiodata } from '@ulmax/frontend';
import { retrivePrescriptions } from './store/prescription-effect';

interface DrugPrescriptionState {
  currentMember?: PersonalBiodata;
}

// creates an array of members
const selectMembersBiodata = (state: RootState) =>
  Object.values(state.userReducer.members);

// retrieve stored prescriptions
const selectMemberPrescription = (state: RootState, cardId: string) =>
  state.prescriptionReducer.prescriptions[cardId];

function DrugPrescription({}: RouterPath) {
  const { dispatch, getState } = useStore<RootState>();
  const members = selectMembersBiodata(getState()).map(m => m.biodata);
  const [pageState, setPageState] = useState<DrugPrescriptionState>({
    currentMember: members[0],
  });
  const retrieveFromStore = (member: PersonalBiodata) => {
    console.log(member);
    setPageState({ ...pageState, currentMember: member });
    const storedPrescriptions = selectMemberPrescription(
      getState(),
      member.cardnode,
    );
    if (storedPrescriptions?.prescriptions.length === 0) {
      dispatch(retrivePrescriptions({ cardId: member.cardnode }) as any);
      return;
    }
  };
  return (
    <>
      <div className="drug-container">
        <div className="members-select">
          <SelectCardMembers members={members} onChange={retrieveFromStore} />
        </div>
        <div className="drugs-info">
          {selectMemberPrescription(
            getState(),
            pageState.currentMember?.cardnode ?? '',
          )?.prescriptions.map(p => {
            return (
              <div className="drug-details">
                <Tablet
                  hopsital={p.hopsital}
                  owner={p.owner}
                  prescriptions={p.prescriptions}
                  date={new Date(p.date)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DrugPrescription;
