import { Router } from '@reach/router';
import React from 'react';
import SignUp from './authentication/sign-up';
import HomePage from './home-page/home-page';
import ProfileEditor from './users/profile-editor';


const App: React.FC = () => {
  return (
    <Router>
      <HomePage path="/" />
      <SignUp path='register' />
      <ProfileEditor path='profile/edit' />
    </Router>
  );
};

export default App;
