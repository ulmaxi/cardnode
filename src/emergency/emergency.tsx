import React from 'react';
import EmergencyForm from './components/emergency-form';
import { Emergency as E } from '@ulmax/frontend';

function Emergency({}: RouterPath) {
    const onSubmit = (value: E) => { console.log(value)}
    return (<>
        <div>
            <EmergencyForm  hospitals={[]} onSubmit={onSubmit}/>
        </div>
    </>);
}

export default Emergency;