import { useRouter } from 'next/router';
import MarketplaceNavbar from '@/components/specific/marketplace/navbar';

// import ActivityGraph from '@/components/specific/marketplace/activityGraph';

import classes from './profile.module.css';
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
            { page }
        </div>
    );
};
