// TODO: Add user context to file

import React, { useEffect, useState } from 'react';

import MarketplaceNavbar from '@/components/specific/marketplace/Navbar';
import classes from './profile.module.css';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import Profile from '@/components/specific/profile/profile';

const ProfilePage: NextPageWithLayout = function () {
    const router = useRouter();
    const userId = router.query.userId as string;
    return <Profile userId={ userId }></Profile>;
};

export default ProfilePage;

ProfilePage.getLayout = function (page) {
    return (
        <div className={ classes.container }>
            <MarketplaceNavbar/>
            {page}
        </div>
    );
};
