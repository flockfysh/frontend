import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import Loading from '../components/ui/loading';

import api from '../helpers/api';
import Auth from '@/helpers/auth';
import { useRouter } from 'next/router';

interface UserContextMeta {
    payoutOnboardingComplete: boolean;
}

interface UserContext {
    user: User | null;
    meta: UserContextMeta | null;
    setUser: (data: User | null) => void;
    refreshUser: () => void; // this will try to fetch the user again
    getUser: () => Promise<User|null>; // get user data without updating user context
}

export const UserContext = createContext<UserContext>({
    user: null,
    meta: null,
    setUser: () => {},
    refreshUser: () => {},
    getUser: async () => null
});

export function UserWrapper(props: PropsWithChildren) {
    const [user, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState(true);
    const [meta, setMeta] = useState<UserContextMeta | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            
            (async function getUserState() {
                try {
                    const data = (
                        await api.get<Api.Response<{ curUser: User }>>(
                            '/api/auth/currentUser'
                        )
                    ).data;

                    const userData = data.data;

                    const has2FA = await Auth.has2FA();
                    if(has2FA){
                        if (userData.curUser) setCurUser(userData.curUser);
                        else setCurUser(null);
                    }
                    
                    if(userData.curUser&&!has2FA){
                        router.replace('/logout');
                    }
                }
 catch (e) {}

                updateLoading(false);
            })();
        }
    }, [isLoading]);

    useEffect(() => {
        (async function updateMeta() {
            if (user) {
                const onboardingResponse = (
                    await api.get<Api.Response<boolean>>(
                        '/api/users/payout/onboarding'
                    )
                ).data;
                setMeta({
                    payoutOnboardingComplete: onboardingResponse.data,
                });
            }
 else setMeta(null);
        })();
    }, [user]);

    const getUser = async() => {
        const { data } = await api.get<Api.Response<{ curUser: User }>>(
            '/api/auth/currentUser'
        );
        return data.success?data.data.curUser:null;
    };

    if (isLoading) return <Loading />;

    function setUser(user: User | null) {
        setCurUser(user);
    }

    function refreshUser() {
        updateLoading(true);
    }

    const curState = { user, setUser, refreshUser, getUser, meta };
    
    return (
        <UserContext.Provider value={ curState }>
            { props.children }
        </UserContext.Provider>
    );
}
