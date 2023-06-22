import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Login from '@/components/specific/login';

export default function Home() {
    const { push } = useRouter();

    useEffect(() => {
        push('/marketplace');
    }, []);

    return (
        <>
            {/* <h1>Homepage</h1>

            <Login mode="login" /> */}
        </>
    );
}
