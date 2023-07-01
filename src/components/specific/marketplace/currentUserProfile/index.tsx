import { useContext } from 'react';

import ProfileCard from '@/components/specific/marketplace/profileCard';

import { UserContext } from '@/contexts/userContext';

import { getDefaultProfilePicture } from '@/helpers/defaults';

export default function CurrentUserProfile() {
    const { user } = useContext(UserContext);

    if (user)
        return (
            <ProfileCard
                profilePicture={
                    user.profilePhoto?.url ?? getDefaultProfilePicture()
                }
                username={user.username}
            />
        );
    
    return <></>;
}
