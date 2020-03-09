import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React, { useState } from 'react';
import UserBiodataForm from './components/biodata-form';
import CommunalDataForm from './components/communal-form';
import './components/styles.scss';

type ProfileEditorState = {
  currentStep: number;
  biodata?: any;
  communalBiodata?: any;
};

export interface ProfileEditorProp {
  skipable?: boolean;
  editable?: boolean;
  path?: any;
  children?: any;
}

const ProfileEditor = (props: ProfileEditorProp) => {
  const [state, setState] = useState<ProfileEditorState>({ currentStep: 0 });
  const onSubmit = (value: any) => {
    console.log(state.currentStep, value);
    if (state.currentStep === 1) {
      // navigate to another page
      setState({ ...state, currentStep: state.currentStep - 1 });
      return;
    }
    setState({ ...state, currentStep: state.currentStep + 1 });
  };
  return (
    <>
      <div className="profile-editor">
      <div className="profile-editor" >
        <Stepper orientation='vertical' activeStep={state.currentStep}>
          <Step>
            <StepLabel> Personal Information </StepLabel>
            <StepContent>
              <UserBiodataForm onSubmit={onSubmit} />
              
            </StepContent>
          </Step>
          <Step>
            <StepLabel> Security and Community Information </StepLabel>
            <StepContent>
              <CommunalDataForm onSubmit={onSubmit} />
            </StepContent>
          </Step>
        </Stepper>
      </div>
      </div>
    </>
  );
};

export default ProfileEditor;
