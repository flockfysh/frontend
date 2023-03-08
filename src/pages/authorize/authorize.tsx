import React, { useState, useEffect } from 'react';
import type { IconBase } from 'react-icons';
import { RxEyeOpen, RxPencil1 } from 'react-icons/rx';
import Loading from '../../components/loading/loading';
import api from '../../helpers/api';
import classes from './authorize.module.css';

const PERMISSION_MAPPING: Record<string, { description: string, Icon: typeof IconBase }> = {
    'write_dataset': {
        description: 'Can write, edit and delete datasets',
        Icon: RxPencil1,
    },
    'read_dataset': {
        description: 'Can read datasets',
        Icon: RxEyeOpen,
    },
};

interface AuthorizationInstance {
    scope: string[];
    client: {
        name: string;
        website: string;
    };
}

export default function Authorize() {
    const code = new URL(window.location.href).searchParams.get('code');

    const [authorizationInstance, setAuthorizationInstance] = React.useState<AuthorizationInstance | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        (async function authorizeLogin() {
            try {
                const instanceInfo = (await api.get('/api/auth/oauth/deviceAuthorization/public', {
                    params: {
                        // eslint-disable-next-line camelcase
                        user_code: code,
                    },
                })).data.data;
                console.log(instanceInfo);
                setAuthorizationInstance(instanceInfo);
            }
 catch (e) {
                setMessage('Error');
            }

        })();
    }, []);

    if (!authorizationInstance) return <Loading/>;

    return (
        <div className={ classes.authContainer }>
            {
                !message ? (
                    <h1>Success!</h1>
                ) : (
                    <h1>{message}</h1>
                )
            }
        </div>
    );
}
