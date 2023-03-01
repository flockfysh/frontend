import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import Loading from '../components/loading/loading';
import api from '../helpers/api';

interface IUserContext {
    curUser: User | null,
    setUser: (data: User | null) => void;
    refresh: () => void;
}

export const UserContext = createContext<IUserContext>({
    curUser: null as (User | null),
    setUser: () => {},
    refresh: () => {},
});

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isLoading) {
            (async function getUserState() {
                try {
                    const data = (await api.get('/api/auth/currentUser')).data;
                    const userData = data.data;

                    if (userData.curUser) {
                        setCurUser({
                            name: `${ userData.curUser.firstName } ${ userData.curUser.lastName }`,
                            email: userData.curUser.email,
                            profileImage: userData.curUser.profilePhoto,
                            monthlyCost: {} as MonthlyCost,
                            payments: [] as Cost[],
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

    function refresh() {
        updateLoading(true);
    }

    const curState = { curUser, setUser, refresh };

    return (
        <UserContext.Provider value={ curState }>
            {props.children}
        </UserContext.Provider>
    );
}
