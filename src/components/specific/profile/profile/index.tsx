import { useEffect, useState } from 'react';

import UserInfo from '@/components/specific/profile/userInfo';
import DatasetsOwned from '@/components/specific/profile/datasetsOwned';
import UserSettings from '@/components/specific/profile/userSettings/';

import api from '@/helpers/api';

export default function Profile(props: { username: string }) {
    const [curTab, updateCurTab] = useState(0);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetch() {
            const user = await api
                .get<Api.Response<User>>(
                    `/api/users/byUsername/${props.username}`
                )
            

            setUser(user.data.data);
        }

        fetch().then();
    }, [props.username]);

    if (!user) return <></>;

    return (
        <>
            <UserInfo curTab={ curTab } { ...user } updateTab={ updateCurTab } />

            { curTab === 0 && <DatasetsOwned user={ user } /> }

            { curTab === 2 && (
                <UserSettings
                    username={ user.username }
                    email={ user.email }
                    apiKey= {user.apiData.apiKey}
                    mailingList={ true }
                    transferLimit={ user.apiData.transferAmount }
                    downloads={ user.apiData.downloadCount }
                    apiCalls={ user.apiData.apiCount }
                />
            ) }
        </>
    );
}
