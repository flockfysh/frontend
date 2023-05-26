import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import Loading from '../components/loading/loading';

import api from '../helpers/api';

interface UserContext {
    user: User | null;
    setUser: (data: User | null) => void;
    refreshUser: () => void; // this will try to fetch the user again
}

export const UserContext = createContext<UserContext>(
    {
        user: null as (User | null),
        setUser: () => {
        },
        refreshUser: () => {
        },
    }
);

export function UserWrapper(props: PropsWithChildren) {
    const [user, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            (async function getUserState() {
                try {
                    const data = (await api.get('/api/auth/currentUser')).data;
                    const userData = data.data;

                    if (userData.curUser) {
                        setCurUser({
                            name: `${userData.curUser.firstName ?? ''} ${userData.curUser.lastName ?? ''}`,
                            email: userData.curUser.email,
                            profileImage: userData.curUser.profilePhoto,
                        });
                    }
 else {
                        setCurUser(null);
                    }
                }
 catch (e) {
                }

                updateLoading(false);
            })();
        }
    }, [isLoading]);

    if (isLoading) return <Loading/>;

    function setUser(user: User | null) {
        setCurUser(user);
    }

    function refreshUser() {
        updateLoading(true);
    }

    const curState = { user, setUser, refreshUser };
    return (
        <UserContext.Provider value={ curState }>
            {props.children}
        </UserContext.Provider>
    );
}
