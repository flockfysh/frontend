import { useEffect } from 'react';
import { useRouter } from 'next/router';

import api from '@/helpers/api';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        async function logout() {
            await api.get('/api/auth/logout');
            router.replace('/login').then();
        }

        logout().then();
    }, [router]);
}
