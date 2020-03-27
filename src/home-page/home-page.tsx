import { Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { navigate } from '@reach/router';
import React from 'react';
import { useStore } from 'react-redux';
import Login from 'src/authentication/login';
import AppBar from 'src/dashboard/components/layout/toolbar';
import { RootState } from 'src/store';
import './home-page.scss';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ulmax.tech/">
        Ulmax
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

/**
 * selects the authorized user authorization information
 */
const authorization = (state: RootState) => state.authReducer.authorized?.data;

const navigateAuthorized = (state: RootState) => {
  if (authorization(state)) {
    navigate('/dashboard');
  }
};

const HomePage: any = () => {
  const { getState } = useStore<RootState>();
  navigateAuthorized(getState());
  return (
    <>
      <div>
        <AppBar></AppBar>
        <div className="page-container">
          <Card>
            <div className="login-container">
              <Login />
              <div className="copyright-container">
                <Copyright />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomePage;
