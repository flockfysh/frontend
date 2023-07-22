import { useContext } from 'react';

import ProfileCard from '@/components/specific/marketplace/profileCard';

import { UserContext } from '@/contexts/userContext';

export default function CurrentUserProfile({
    showMenu,
}: {
    showMenu: boolean;
}) {
    const { user } = useContext(UserContext);

    if (user)
        return (
            <ProfileCard
                showMenu={ showMenu }
                profilePicture={ user.profilePhoto?.url }
                username={ user.username }
            />
        );

    return <></>;
}
