import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { UserContext } from '@/contexts/userContext';

export default function PrivateRoutes() {
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (!user && router) router.replace('/login').then();
    }, [router, user]);
}
