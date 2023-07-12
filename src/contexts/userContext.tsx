import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import Loading from '../components/ui/loading';

import api from '../helpers/api';

interface UserContextMeta {
    payoutOnboardingComplete: boolean,
}

interface UserContext {
    user: User | null;
    meta: UserContextMeta | null;
    setUser: (data: User | null) => void;
    refreshUser: () => void; // this will try to fetch the user again
}

export const UserContext = createContext<UserContext>({
    user: null,
    meta: null,
    setUser: () => {
    },
    refreshUser: () => {
    },
});

export function UserWrapper(props: PropsWithChildren) {
    const [user, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState(true);
    const [meta, setMeta] = useState<UserContextMeta | null>(null);

    useEffect(() => {
        navigator.serviceWorker.register('/sw.js');

        if (isLoading) {
            (async function getUserState() {
                try {
                    const data = (
                        await api.get<Api.Response<{ curUser: User }>>(
                            '/api/auth/currentUser',
                        )
                    ).data;

                    const userData = data.data;

                    if (userData.curUser) setCurUser(userData.curUser);
                    else setCurUser(null);
                }
 catch (e) {
                }

                updateLoading(false);
            })();
        }
    }, [isLoading]);

    useEffect(() => {
        (async function updateMeta() {
            if (user) {
                const onboardingResponse = (await api.get<Api.Response<boolean>>('/api/users/payout/onboarding')).data;
                setMeta({
                    payoutOnboardingComplete: onboardingResponse.data,
                });
            }
            else {
                setMeta(null);
            }
        }());
    }, [user]);

    if (isLoading) return <Loading/>;

    function setUser(user: User | null) {
        setCurUser(user);
    }

    function refreshUser() {
        updateLoading(true);
    }

    const curState = { user, setUser, refreshUser, meta };
    return (
        <UserContext.Provider value={ curState }>
            { props.children }
        </UserContext.Provider>
    );
}
