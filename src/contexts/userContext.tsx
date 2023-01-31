import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import axios from 'axios';

import Loading from '../components/loading/loading';
import { serverURL } from '../settings';
import api from '../helpers/api';

export const UserContext = createContext<{
    curUser: User | null,
    loggedIn: boolean,
    refresh: () => void
}>({
    curUser: null,
    loggedIn: false,
    refresh: () => {}
});

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!loaded) {
            api.get('/').then(async res => {
                const data = await res.data.data;
                setLoaded(true);

                if(data.loggedIn) {
                    setCurUser({
                        name: `${ data.curUser.firstName } ${ data.curUser.lastName }`,
                        email: data.curUser.email,
                        profileImage: data.curUser.profilePhoto,
                        monthlyCost: {} as MonthlyCost,
                        payments: [] as Cost[]
                    });
                } 
                else {
                    setCurUser(null);
                }
            });
        }
    }, [loaded]);

    if(!loaded) return <Loading/>;

    function refresh() {
        setLoaded(false);
    }

    let loggedIn: boolean;
    loggedIn = !!curUser;

    const curState = { curUser, refresh, loggedIn };

    return (
        <UserContext.Provider value={ curState }>
            { props.children }
        </UserContext.Provider>
    );
}
