import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import { useRouter } from 'next/router';
import api from '@/helpers/api';



function Success() {
    const router = useRouter();


    useEffect(() => {
        async function load() {
            api.post('/api/users/payout/onboardingComplete', {
                accountId: router.query.accountId
            })
        }
        load().then(() => {
            router.push('/marketplace')
        }).catch((e) => {
            console.log(e)
        }) 
    }, []);

    return (
        <>
            Onboarding success
        </>    
    );
}


export default Success;
