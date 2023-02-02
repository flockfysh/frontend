import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import axios from 'axios';

import Loading from '../components/loading/loading';
import { serverURL } from '../settings';
import api from '../helpers/api';

export const UserContext = createContext(
    {
        curUser: null as (User | null),
        isLoggedIn: false,
        setLoginState: (_: boolean) => {},
        setUser: (_: User) => {}
    }
);

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    
    const [isLoggedIn, updateLoggedInState] = useState(false);

    const [isLoading, updateLoading] = useState(false);

    useEffect(() => {
        updateLoading(true);

        (async function getUserState() {
            try {
                const data = (await api.get(`${ serverURL }/authenticate`)).data;
                
                if(data.success) {
                    setCurUser({
                        name: `${ data.curUser.firstName } ${ data.curUser.lastName }`,
                        email: data.curUser.email,
                        profileImage: data.curUser.profilePhoto,
                        monthlyCost: {} as MonthlyCost,
                        payments: [] as Cost[]
                    });
                } 
                else setCurUser(null);
            }
            catch {}

            updateLoading(false);
        })();
    }, []);

    if(isLoading) return <Loading/>;

    function setLoginState(state: boolean) {
        updateLoggedInState(state);
    }

    function setUser(user: User) {
        setCurUser(user);
    }

    const curState = { curUser, isLoggedIn, setLoginState, setUser };

    return (
        <UserContext.Provider value={ curState }>
            { props.children }
        </UserContext.Provider>
    );
}
