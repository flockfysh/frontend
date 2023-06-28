import { UserContext } from '@/contexts/userContext';
import React from 'react';
import ProfileCard from '@/components/specific/marketplace/ProfileCard';

export default function CurrentUserProfile() {
    const { user } = React.useContext(UserContext);

    if (user) {
        return <ProfileCard profilePicture={ user.profilePhoto ?? '' } username={ user.username.slice(0, 16) } />;
    }
    return <></>;
}
