import { useRouter } from 'next/router';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';

// import ActivityGraph from '@/components/specific/marketplace/activityGraph';

import classes from './profile.module.css';
import { NextPageWithLayout } from '@/pages/_app';
import Profile from '@/components/specific/profile/profile';
import Footer from '@/components/specific/marketplace/footer';
import React from 'react';

const ProfilePage: NextPageWithLayout = function () {
    const router = useRouter();
    const username = router.query.username;
    if (typeof username === 'string')
        return <Profile username={username}></Profile>;
    
    return <></>;
};

export default ProfilePage;

ProfilePage.getLayout = function (page) {
    return (
        <div className={classes.container}>
            <MarketplaceNavbar />
            {page}
            <Footer />
        </div>
    );
};
