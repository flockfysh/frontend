import {PropsWithChildren, useEffect, useState, createContext} from 'react';
import Loading from '../components/loading/loading';
import api from '../helpers/api';

interface IUserContext {
    curUser: User | null;
    isLoggedIn: boolean;
    refreshUserState: () => void;
}

export const UserContext = createContext<IUserContext>({
    curUser: null as (User | null),
    isLoggedIn: false,
    refreshUserState: () => {
    },
});

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = useState<User | null>(null);
    const [isLoading, updateLoading] = useState<boolean>(true);

    // Removed. Why do we happen to need to check the logged in state? Can't we simply base it on the user -
    // can we set it to isLoggedIn = !!user?
    // const [isLoggedIn, updateLoggedInState] = useState(false);

    useEffect(() => {
        (async function getUserState() {
            try {
                const data = (await api.get(`${ serverURL }/authenticate`)).data;
                
                if (data.success) {
                    const userData = data.data;

                    setCurUser({
                        name: `${userData.curUser.firstName} ${userData.curUser.lastName}`,
                        email: userData.curUser.email,
                        profileImage: userData.curUser.profilePhoto,
                        monthlyCost: {} as MonthlyCost,
                        payments: [] as Cost[]
                    });
                } else {
                    setCurUser(null);
                }
            } catch (e) {

            }
            updateLoading(false);
        })();
    }, [isLoading]);

    if (isLoading) return <Loading/>;

    const isLoggedIn = Boolean(curUser);

    function refreshUserState() {
        updateLoading(true);
    }

    const curState = {curUser, isLoggedIn, refreshUserState};
    return (
        <UserContext.Provider value={curState}>
            {props.children}
        </UserContext.Provider>
    );
}
