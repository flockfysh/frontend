import { useContext } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import MarketplaceNavbar from '@/components/specific/marketplace/navbar';
import Profile from '@/components/specific/profile/profile';
import Footer from '@/components/specific/marketplace/footer';

import { UserContext } from '@/contexts/userContext';

import classes from './profile.module.css';

const ProfilePage: NextPageWithLayout = function () {
    const { user } = useContext(UserContext);

    if (user) return <Profile username={ user.username } />;
    
    return <></>;
};

export default ProfilePage;

ProfilePage.getLayout = function (page) {
    return (
        <div className={ classes.container }>
            <MarketplaceNavbar />
            { page }
            <Footer />
        </div>
    );
};
