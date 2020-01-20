import { Router } from '@reach/router';
import React from 'react';
import Registration from './authentication/registration';
import SignUp from './authentication/sign-up';
import Dashboard from './dashboard/dashboard';
import HomePage from './home-page/home-page';
import ProfileEditor from './users/profile-editor';

const App: React.FC = () => {
  return (
    <Router>
      <HomePage path="/" />
      <SignUp path='_register'>
      </SignUp>
      <ProfileEditor path='registerprofile/:id' />
      <Dashboard path="dashboard"/>
      <Registration path='register' />
    </Router>
  );
};

export default App;
