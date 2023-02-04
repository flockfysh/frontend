import { PropsWithChildren, useEffect, useState, createContext } from 'react';

import Loading from '../components/loading/loading';
import api from '../helpers/api';

export const UserContext = createContext({
    curUser: null as (User | null),
    setUser: (_: (User | null)) => {}
});

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState(true);

    // Removed. Why do we happen to need to check the logged in state? Can't we simply base it on the user -
    // can we set it to isLoggedIn = !!user?
    // const [isLoggedIn, updateLoggedInState] = useState(false);

    useEffect(() => {
        (async function getUserState() {
            try {
                const data = (await api.get('/authenticate')).data;
                
                if (data.success) {
                    const userData = data.data;

                    setCurUser({
                        name: `${userData.curUser.firstName} ${userData.curUser.lastName}`,
                        email: userData.curUser.email,
                        profileImage: userData.curUser.profilePhoto,
                        monthlyCost: {} as MonthlyCost,
                        payments: [] as Cost[]
                    });
                } 
                else setCurUser(null);
            } 
            catch {}

            updateLoading(false);
        })();
    }, [isLoading]);

    if (isLoading) return <Loading/>;

    function setUser(user: User | null) {
        setCurUser(user);
    }

    const curState = { curUser, setUser };

    return (
        <UserContext.Provider value={ curState }>
            { props.children }
        </UserContext.Provider>
    );
}
