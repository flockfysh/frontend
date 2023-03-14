import React, { useState, useEffect } from 'react';
import type { IconBase } from 'react-icons';
import { RxEyeOpen, RxPencil1 } from 'react-icons/rx';
import { FaMoneyBillAlt, FaCloud } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import Loading from '../../components/loading/loading';
import api from '../../helpers/api';
import classes from './authorize.module.css';
import Button from '../../components/UI/button/button';
import GradientLink from '../../components/UI/gradientLink/gradientLink';
import { AxiosError } from 'axios';

type AuthorizationFeedback = 'reject' | 'approve';
const PERMISSION_MAPPING: Record<string, { description: string, Icon: typeof IconBase }> = {
    'write_dataset': {
        description: 'Create, provide feedback and delete datasets',
        Icon: RxPencil1,
    },
    'read_dataset': {
        description: 'Read datasets and access images',
        Icon: RxEyeOpen,
    },
    'share_dataset': {
        description: 'Share your datasets to other organizations',
        Icon: FaCloud,
    },
    'manage_account': {
        description: 'Manage your account',
        Icon: IoPerson,
    },
};

interface AuthorizationInstance {
    scope: string[];
    client: {
        name: string;
        website: string;
    };
}

function PermissionItem(props: { description: string, Icon: typeof IconBase }) {
    return (
        <li className={ classes.permissionItem }>
            <props.Icon className={ classes.permissionIcon }></props.Icon>
            <p>
                {props.description}
            </p>
        </li>
    );
}

export default function Authorize() {
    const code = new URL(window.location.href).searchParams.get('code');

    const [authorizationInstance, setAuthorizationInstance] = React.useState<AuthorizationInstance | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async function authorizeLogin() {
            try {
                const instanceInfo = (await api.get('/api/auth/oauth/deviceAuthorization/public', {
                    params: {
                        // eslint-disable-next-line camelcase
                        user_code: code,
                    },
                })).data.data;
                setAuthorizationInstance(instanceInfo);
            }
 catch (e) {
                setError('This authorization code is either invalid or expired.');
            }

        })();
    }, []);

    async function authorize(mode: AuthorizationFeedback) {
        const urls: Record<AuthorizationFeedback, string> = {
            'approve': '/api/auth/oauth/deviceAuthorization/accept',
            'reject': '/api/auth/oauth/deviceAuthorization/reject',
        };
        try {
            await api.post(urls[mode], {}, {
                params: {
                    // eslint-disable-next-line camelcase
                    user_code: code,
                },
            });
            window.close();
        }
        catch (e) {
            if (e instanceof AxiosError) setError(e.response?.data.error.message);
        }
    }

    if (error) {
        return (
            <div className={ classes.authContainer }>
                <div className={ classes.authContainerInner }>
                    <h2 className={ classes.errorHeading }>Authorization error</h2>
                    <p>{error}</p>
                    <GradientLink to={ '/dashboard' }>Go to dashboard</GradientLink>
                </div>
            </div>
        );
    }

    if (!authorizationInstance) return <Loading/>;

    return (
        <div className={ classes.authContainer }>
            <form className={ classes.authContainerInner }>
                <div className={ classes.appDetails }>
                    <div className={ classes.appLogo }></div>
                    <h2 className={ classes.appName }>{authorizationInstance.client.name}</h2>
                    <p>wants to:</p>
                </div>
                <ul className={ classes.permissionList }>
                    {authorizationInstance.scope.map(function generatePermissionItem(scope, index) {
                        if (PERMISSION_MAPPING[scope]) {
                            const permObject = PERMISSION_MAPPING[scope];
                            return (
                                <PermissionItem description={ permObject.description } Icon={ permObject.Icon }
                                                key={ index }/>
                            );
                        }
                        return <></>;
                    })}
                </ul>
                <div className={ classes.authorizationButtons }>
                    <Button className={ classes.rejectAuthorizationButton } onClick={ async e => {
                        e.preventDefault();
                        await authorize('reject');
                    } }>Reject</Button>
                    <Button gradient={ true } onClick={ async e => {
                        e.preventDefault();
                        await authorize('approve');
                    } }>Approve</Button>
                </div>
            </form>
        </div>
    );
}
