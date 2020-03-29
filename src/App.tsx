import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Login from 'src/authentication/login';


const { persistor, store } = getStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <HomePage path="/" >
            <Login path="/" />
          </HomePage>
          <Dashboard path="dashboard">
            <DashboardHome path="/" />
            <Prescriptions path="prescriptions" />
            <MemberManager path="members" />
            <AddMember path="add-member" />
            <UpdateBiodata path="update-member/:biodataId" />
            <DisplayBiodata path="profile/:biodataId" />
            <Emergency path="emergency" />
          </Dashboard>
          <Registration path="register">
            <SignUp path="/"></SignUp>
            <CreatePrincipal path="profile/:id" />
          </Registration>
        </Router>
        <ToastContainer/>
      </PersistGate>
    </Provider>
  );
};

export default App;
