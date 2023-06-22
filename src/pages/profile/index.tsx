import { useContext, useState } from 'react';

import { UserContext } from '@/contexts/userContext';

import UserInfo from '@/components/specific/profile/userInfo/userInfo';
import DatasetsOwned from '@/components/specific/profile/datasetsOwned/datasetsOwned';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';

import ActivityGraph from '@/components/specific/marketplace/activityGraph';

import classes from './profile.module.css';

export default function Profile() {
    // 0=datasets, 1=activity, 2=settings
    const [curTab, updateCurTab] = useState(0);

    return (
        <div className={classes.container}>
            <MarketplaceNavbar />

            <UserInfo
                followers={2000}
                following={232}
                name="User One"
                userName="userOne"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                updateTab={ updateCurTab }
            />

            { curTab === 0 && <DatasetsOwned /> }
            { curTab === 1 && <ActivityGraph type="user" /> }
        </div>
    );
}
