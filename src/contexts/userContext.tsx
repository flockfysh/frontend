import { PropsWithChildren, useEffect, useState, createContext } from 'react';
import Loading from '../components/loading/loading';
import api from '../helpers/api';

export const UserContext = createContext({
    curUser: null as (User | null),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (_: User | null) => {},
});

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState<boolean>(true);

    useEffect(() => {
        (async function getUserState() {
            try {
                const data = (await api.get(`/`)).data;
                const userData = data.data;

                if(userData.curUser) {
                    setCurUser({
                        name: `${userData.curUser.firstName} ${userData.curUser.lastName}`,
                        email: userData.curUser.email,
                        profileImage: userData.curUser.profilePhoto,
                        monthlyCost: {} as MonthlyCost,
                        payments: [] as Cost[]
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
    }, []);

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
