import { useEffect, useState } from 'react';

import UserInfo from '@/components/specific/profile/userInfo';
import DatasetsOwned from '@/components/specific/profile/datasetsOwned';
import UserSettings from '@/components/specific/profile/userSettings/';

import api from '@/helpers/api';

export default function Profile(props: { username: string }) {
    const [curTab, updateCurTab] = useState(0);
    const [user, setUser] = useState<RedactedUser | null>(null);

    useEffect(() => {
        async function fetch() {
            const user = await api
                .get<Api.Response<RedactedUser>>(
                    `/api/users/byUsername/${props.username}`
                )
                .then((res) => res.data.data);
            setUser(user);
        }

        fetch().then();
    }, [props.username]);

    if (!user) return <></>;

    return (
        <>
            <UserInfo curTab={curTab} {...user} updateTab={updateCurTab} />

            {curTab === 0 && <DatasetsOwned user={user} />}
            {/*{curTab === 1 && <ActivityGraph />}*/}

            {curTab === 2 && (
                <UserSettings
                    name="user"
                    email="trial@email.com"
                    apiKey="Sf3$dqq34Fa4gD43@F$&S"
                    mailingList={true}
                    transferLimit={1.9}
                    downloads={7}
                    apiCalls={7898}
                />
            )}
        </>
    );
}
