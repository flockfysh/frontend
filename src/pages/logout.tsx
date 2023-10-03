import { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import api from '@/helpers/api';
import { UserContext } from '@/contexts/userContext';

export default function Logout() {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const userRef = useRef(user);

    useEffect(() => {
        userRef.current = user;
    }, [user]);
    

    useEffect(() => {
        async function logout() {
            
            userRef.current && await api.get('/api/auth/logout');
            setUser(null);
            router.replace('/login').then();
        }

        logout().then();
    }, [router, setUser ]);
}
