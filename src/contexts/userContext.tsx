import React, {PropsWithChildren, useEffect, useState} from 'react';
import Loading from "../components/loading/loading";
import {serverURL} from "../settings";

export const UserContext = React.createContext<{
    curUser?: User | null,
    loggedIn?: boolean,
    refresh: () => void
}>({
    curUser: undefined,
    loggedIn: undefined,
    refresh: () => {
    },
});

export function UserWrapper(props: PropsWithChildren) {
    const [curUser, setCurUser] = React.useState<User | null | undefined>();

    React.useEffect(() => {
        if (curUser === undefined) {
            fetch(serverURL).then(async res => {
                const data = await res.json();
                console.log(data);
                if (data.loggedIn) {
                    setCurUser(data.curUser as User);
                } else {
                    setCurUser(null);
                }
            });
        }
    }, [curUser]);

    if (curUser === undefined) return <Loading/>;

    function refresh() {
        setCurUser(undefined);
    }

    let loggedIn: boolean|undefined = undefined;

    if (curUser) {
        loggedIn = true;
    } else if (curUser === null) {
        loggedIn = false;
    }

    const curState = {curUser, refresh, loggedIn};

    console.log(curState);

    return <UserContext.Provider value={curState}>
        {props.children}
    </UserContext.Provider>;
}