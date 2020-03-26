import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Alert from '@material-ui/lab/Alert';
import { CommunalData, PersonalBiodata } from '@ulmax/frontend';
import React, { useState } from 'react';
import AccessLevelForm, { AccessLevelFormState } from './access-level-form';
import UserBiodataForm from './biodata-form';
import CommunalDataForm from './communal-form';
import './styles.scss';

export type ProfileEditorState = {
  currentStep: number;
  biodata?: any;
  communalBiodata?: any;
  accessLevel?: AccessLevelFormState;
};

/**
 * configuration for the member form details
 */
export interface ProfileEditorProp {
  loading?: boolean;
  editable?: boolean;
  onSubmit?: (value: ProfileEditorState) => any;
  error?: string;
  value?: Partial<ProfileEditorState>;
}

const ProfileEditor = (props: ProfileEditorProp) => {
  const [state, setState] = useState<ProfileEditorState>({ currentStep: 0 });
  const submitPersonal = (value: PersonalBiodata) => {
    setState({ ...state, currentStep: state.currentStep + 1, biodata: value });
  };
  const submitCommunal = (value: CommunalData) => {
    setState({
      ...state,
      currentStep: state.currentStep + 1,
      communalBiodata: value,
    });
  };
  const submitAccess = (value: AccessLevelFormState) => {
    setState({ ...state, accessLevel: value });
    if (props.onSubmit) {
      props.onSubmit(state);
    }
  };
  return (
    <>
      <div>
        <div hidden={props.loading} className="profile-editor">
          <Stepper orientation="vertical" activeStep={state.currentStep}>
            <Step>
              <StepLabel onClick={() => setState({ currentStep: 0 })}>
                Personal Information
              </StepLabel>
              <StepContent>
                <UserBiodataForm
                  value={props.value?.biodata}
                  onSubmit={submitPersonal}
                  disable={!props.editable}
                  hideSubmitBtn={!props.editable}
                />
                <div hidden={props.editable}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setState({ currentStep: 1 })}
                  >
                    Next
                  </Button>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel onClick={() => setState({ currentStep: 1 })}>
                Security and Community Information
              </StepLabel>
              <StepContent>
                <CommunalDataForm
                  value={props.value?.communalBiodata}
                  onSubmit={submitCommunal}
                  disable={!props.editable}
                  hideSubmitBtn={!props.editable}
                />
                <div hidden={props.editable}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setState({ currentStep: 2 })}
                  >
                    Previous
                  </Button>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel onClick={() => setState({ currentStep: 2 })}>
                Access Level
              </StepLabel>
              <StepContent>
                <AccessLevelForm
                  onSubmit={submitAccess}
                  disable={!props.editable}
                  hideSubmitBtn={!props.editable}
                  value={props.value?.accessLevel}
                />
                <div hidden={props.editable}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setState({ currentStep: 0 })}
                  >
                    Next
                  </Button>
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </div>
        <div hidden={!props.loading}>
          <CircularProgress />
        </div>
        <div hidden={props.error ? false : true}>
          <Alert variant="filled" severity="error">
            {props.error}
          </Alert>
        </div>
      </div>
    </>
  );
};

export default ProfileEditor;
