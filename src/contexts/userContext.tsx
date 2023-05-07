import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import api from '../helpers/api';

interface UserContext {
    curUser: User | null,
    setUser: (data: User | null) => void;
    refresh: () => void;
    loaded: boolean;
}

export const UserContext = createContext<UserContext>({
    curUser: null,
    setUser: () => {
    },
    refresh: () => {
    },
    loaded: false,
});

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    const [loaded, updateLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
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

                updateLoaded(true);
            })();
        }
    }, [loaded]);

    function setUser(user: User | null) {
        setCurUser(user);
    }

    function refresh() {
        updateLoaded(false);
    }

    const curState = { curUser, setUser, refresh, loaded };
    return (
        <UserContext.Provider value={ curState }>
            {props.children}
        </UserContext.Provider>
    );
}
