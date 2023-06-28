import { NextPageWithLayout } from '@/pages/_app';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/userContext';
import Profile from '@/components/specific/profile/profile';
import classes from '@/pages/profile/profile.module.css';
import MarketplaceNavbar from '@/components/specific/marketplace/Navbar';

const ProfilePage: NextPageWithLayout = function () {
    const { user } = useContext(UserContext);
    if (!user) {
        return <></>;
    }

    return <Profile userId={ user._id }></Profile>;
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
