import React from 'react';
import MemberList, {MemberDetails} from './members/members';
import Link from '@material-ui/core/Link'

function MemberManager({}: RouterPath) {
    const members: MemberDetails[] = [];
    return (<> 
    <div className="members-page">
        <Link variant='button' href='/dashboard/add-member'> Add Member </Link>
        <MemberList members={members}/>
    </div>
    </>)
}

export default MemberManager;