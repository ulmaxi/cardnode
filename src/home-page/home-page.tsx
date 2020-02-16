import { Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Login from 'src/authentication/login';
import './styles.scss';


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

const HomePage: any = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
