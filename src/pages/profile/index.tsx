import MarketplaceNavbar from '@/components/specific/marketplace/navbar';


import classes from './profile.module.css';
import { NextPageWithLayout } from '@/pages/_app';
import Profile from '@/components/specific/profile/profile';
import Footer from '@/components/specific/marketplace/footer';
import React, { useContext } from 'react';
import { UserContext } from '@/contexts/userContext';

const ProfilePage: NextPageWithLayout = function () {
    const { user } = useContext(UserContext);

    if (user)
        return <Profile username={ user.username }/>;

    return <></>;
};

export default ProfilePage;

ProfilePage.getLayout = function (page) {
    return (
        <div className={ classes.container }>
            <MarketplaceNavbar/>
            { page }
            <Footer/>
        </div>
    );
};
