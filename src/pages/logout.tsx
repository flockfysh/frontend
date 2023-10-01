import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import api from '@/helpers/api';
import { UserContext } from '@/contexts/userContext';

export default function Logout() {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        async function logout() {
            
            user && await api.get('/api/auth/logout');
            setUser(null);
            router.replace('/login').then();
        }

        logout().then();
    }, [router, setUser, user]);
}
