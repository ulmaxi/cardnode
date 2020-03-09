import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Registration from './authentication/registration';
import SignUp from './authentication/sign-up';
import Dashboard from './dashboard/dashboard';
import HomePage from './home-page/home-page';
import getStore from './store';
import ProfileEditor from './users/profile-editor';

const { persistor, store } = getStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
        <Router>
          <HomePage path="/" />
          <ProfileEditor path="registerprofile/:id" />
          <Dashboard path="dashboard" />
          <Registration path="register">
            <SignUp path="auth"></SignUp>
          </Registration>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
