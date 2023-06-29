// TODO: Add user context to file

import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import UserInfo from '@/components/specific/profile/userInfo';
import DatasetsOwned from '@/components/specific/profile/datasetsOwned';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import UserSettings from '@/components/specific/profile/userSettings';

// import ActivityGraph from '@/components/specific/marketplace/activityGraph';
import Footer from '@/components/specific/marketplace/footer';

import { UserContext } from '@/contexts/userContext';

import classes from './profile.module.css';

export default function Profile() {
    // 0=datasets, 1=activity, 2=settings
    const [curTab, updateCurTab] = useState(0);
    
    const router = useRouter();
    const { username } = router.query;
    
    // ! TEMP
    const { user } = useContext(UserContext);

    if(!user) return <></>;

    return (
        <div className={ classes.container }>
            <MarketplaceNavbar />

            <UserInfo
                followers={ 2000 }
                following={ 232 }
                name={ user.firstName + ' ' + user.lastName }
                username={ username! as string }
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                updateTab={ updateCurTab }
                profilePic={ user.profilePhoto! }
                curTab={ curTab }
            />

            { curTab === 0 && <DatasetsOwned /> }
            { /* {curTab === 1 && <ActivityGraph />} */ }

            { curTab === 2 && (
                <UserSettings
                    name={ user.username }
                    email={ user.email }
                    apiKey="Sf3$dqq34Fa4gD43@F$&S"
                    mailingList={ true }
                    transferLimit={ 1.9 }
                    downloads={ 7 }
                    apiCalls={ 7898 }
                />
            ) }

            <Footer />
        </div>
    );
}
