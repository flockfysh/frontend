import React from 'react';
import api from '@/helpers/api';
import { useRouter } from 'next/router';

export default function Logout() {
    const router = useRouter();

    React.useEffect(() => {
        async function logout() {
            await api.get('/api/auth/logout');
            router.replace('/login').then();
        }

        logout().then();
    }, []);
}
