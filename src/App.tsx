import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Registration from './authentication/registration';
import SignUp from './authentication/sign-up';
import Dashboard from './dashboard/dashboard';
import DashboardHome from './dashboard/components/home-board/home-board';
import HomePage from './home-page/home-page';
import getStore from './store';
import ProfileEditor from './users/profile-editor';
import Prescriptions from './prescriptions/prescription';
import MemberManager from './users/members';
import Emergency from './emergency/emergency';

const { persistor, store } = getStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
        <Router>
          <HomePage path="/" />
          <Dashboard path="dashboard">
            <DashboardHome path="home"/>
            <Prescriptions path="prescriptions"/>
            <MemberManager path="members" />
            <ProfileEditor path="add-member" editable={true} />
            <ProfileEditor path="profile/:id" editable={false} />
            <Emergency path="emergency" />
          </Dashboard>
          <Registration path="register">
            <SignUp path="auth"></SignUp>
            <ProfileEditor path="profile/:id" />
          </Registration>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
