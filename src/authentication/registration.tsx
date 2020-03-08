import { Card } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import logo from 'src/ulmax-branding.png';
import ProfileEditor from 'src/users/profile-editor';
import './styles.scss';
   
const Profiler = <ProfileEditor />;

export default function Registration({ children }: RouterPath) {
    return (
        <div className="registration-bg">
            <AppBar style={{backgroundColor: 'purple'}} variant='elevation' position={'sticky'}>
                <Toolbar className="registration-toolbar"  variant='dense' >
                <img src={logo} height={'30px'} />
                    <Typography variant={'h6'}>
                        Registration
                    </Typography>

                </Toolbar>
            </AppBar>

            <Card>
                { children }
            </Card>
            {/* <div className="registration-content">
                        <div className="profile-editor">
                        </div>
            </div> */}
        </div>
    )
}
