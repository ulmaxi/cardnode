import { Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import React from 'react';
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

const HomePage: any = ({ children }: RouterPath) => {
  
  return (
    <>
      <div>
        <AppBar></AppBar>
        <div className="page-container">
          <Card>
            <div className="login-container">
              { children }
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
