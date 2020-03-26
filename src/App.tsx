import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Registration from './authentication/registration';
import SignUp from './authentication/sign-up';
import DashboardHome from './dashboard/components/home-board/home-board';
import Dashboard from './dashboard/dashboard';
import Emergency from './emergency/emergency';
import HomePage from './home-page/home-page';
import Prescriptions from './prescriptions/prescription';
import getStore from './store';
import AddMember from './users/add-details';
import CreatePrincipal from './users/create-principal-details';
import DisplayBiodata from './users/display-details';
import MemberManager from './users/members';
import UpdateBiodata from './users/update-details';

const { persistor, store } = getStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <HomePage path="/" />
          <Dashboard path="dashboard">
            <DashboardHome path="home" />
            <Prescriptions path="prescriptions" />
            <MemberManager path="members" />
            <AddMember path="add-member" />
            <UpdateBiodata path="update-member/:id" />
            <DisplayBiodata path="profile/:id" />
            <Emergency path="emergency" />
          </Dashboard>
          <Registration path="register">
            <SignUp path="auth"></SignUp>
            <CreatePrincipal path="profile/:id" />
          </Registration>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
