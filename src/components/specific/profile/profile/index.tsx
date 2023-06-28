import React, { useEffect, useState } from 'react';
import api from '@/helpers/api';
import UserInfo from '@/components/specific/profile/userInfo';
import DatasetsOwned from '@/components/specific/profile/datasetsOwned';
import UserSettings from '@/components/specific/profile/userSettings/userSettings';
import Footer from '@/components/specific/marketplace/footer';

export default function Profile(props: {
    userId: string;
}) {
    const [curTab, updateCurTab] = useState(0);
    const [user, setUser] = useState<RedactedUser | null>(null);

    useEffect(() => {
        async function fetch() {
            const user = await api.get<Api.Response<RedactedUser>>(`/api/users/${props.userId}`).then(res => res.data.data);
            setUser(user);
        }

        fetch().then();
    }, [props.userId]);

    if (!user) {
        return <></>;
    }

    return (
        <>
            <UserInfo
                { ...user }
                updateTab={ updateCurTab }
            />

            {curTab === 0 && <DatasetsOwned user={ user }/>}
            {/*{curTab === 1 && <ActivityGraph />}*/}

            {curTab === 2 && (
                <UserSettings
                    name="user"
                    email="trial@email.com"
                    apiKey="Sf3$dqq34Fa4gD43@F$&S"
                    mailingList={ true }
                    transferLimit={ 1.9 }
                    downloads={ 7 }
                    apiCalls={ 7898 }
                />
            )}
            <Footer/>
        </>
    );
}
