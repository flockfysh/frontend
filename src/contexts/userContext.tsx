import { PropsWithChildren, useEffect, useState, createContext } from 'react';

import Loading from '../components/loading/loading';
import api from '../helpers/api';

export const UserContext = createContext(
    {
        curUser: null as (User | null),
        setUser: (_: User) => {}
    }
);

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState(false);

    useEffect(() => {
        updateLoading(true);
        
        (async function getUserState() {
            try {
                const data = (await api.get('/')).data;
                
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
    }, []);

    if(isLoading) return <Loading/>;

    function setUser(user: User) {
        setCurUser(user);
    }

    const curState = { curUser, setUser };

    return (
        <UserContext.Provider value={ curState }>
            { props.children }
        </UserContext.Provider>
    );
}
