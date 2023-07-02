import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';

import { ReactSVG } from 'react-svg';
import { AxiosError } from 'axios';

import { LoadingScreen } from '@/components/ui/loading';
import ActionPopup from '@/components/ui/modals/actionPopup';

import pen from '@/icons/main/pen-tool.svg';
import eye from '@/icons/main/eye.svg';
import share from '@/icons/main/share.svg';
import user from '@/icons/main/user.svg';

import api from '@/helpers/api';

import classes from './styles.module.css';

type AuthorizationFeedback = 'reject' | 'approve';

const PERMISSION_MAPPING: Record<
    string,
    { description: string; Icon: StaticImageData }
> = {
    // eslint-disable-next-line camelcase
    write_dataset: {
        description:
            'Create, provide feedback and delete datasets as well as pull requests',
        Icon: pen,
    },
    // eslint-disable-next-line camelcase
    read_dataset: {
        description: 'Read datasets and access images',
        Icon: eye,
    },
    // eslint-disable-next-line camelcase
    manage_dataset: {
        description:
            'Share your datasets to other accounts and edit/delete datasets',
        Icon: share,
    },
    // eslint-disable-next-line camelcase
    manage_account: {
        description: 'Manage your account',
        Icon: user,
    },
};

interface AuthorizationInstance {
    scope: string[];
    client: {
        name: string;
        website: string;
    };
}

function PermissionItem(props: { description: string; icon: StaticImageData }) {
    return (
        <li className={ classes.permissionItem }>
            <ReactSVG src={ props.icon.src } className={ classes.permissionIcon } />
            <p>{ props.description }</p>
        </li>
    );
}

export default function Authorize() {
    const code = new URL(window.location.href).searchParams.get('code');
    const router = useRouter();

    const [authorizationInstance, setAuthorizationInstance] =
        useState<AuthorizationInstance | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async function authorizeLogin() {
            try {
                const instanceInfo = (
                    await api.get(
                        '/api/auth/oauth/deviceAuthorization/public',
                        {
                            params: {
                                // eslint-disable-next-line camelcase
                                user_code: code,
                            },
                        }
                    )
                ).data.data;

                setAuthorizationInstance(instanceInfo);
            }
 catch (e) {
                setError(
                    'This authorization code is either invalid or expired.'
                );
            }
        })();
    }, [code]);

    async function authorize(mode: AuthorizationFeedback) {
        const urls: Record<AuthorizationFeedback, string> = {
            approve: '/api/auth/oauth/deviceAuthorization/accept',
            reject: '/api/auth/oauth/deviceAuthorization/reject',
        };

        try {
            await api.post(
                urls[mode],
                {},
                {
                    params: {
                        // eslint-disable-next-line camelcase
                        user_code: code,
                    },
                }
            );

            window.close();
            router.push(`/datasets`);
        }
 catch (e) {
            if (e instanceof AxiosError)
                setError(e.response?.data.error.message);
        }
    }

    if (error) {
        return (
            <ActionPopup
                popupTitle="Sign in to Flockfysh"
                blurBg={ true }
                onClose={ () => {
                    router.push(`/datasets`).then();
                } }
                className={ classes.authContainerOuter }
            >
                <div className={ classes.authContainerInner }>
                    <h2 className={ classes.errorHeading }>
                        Authorization error
                    </h2>

                    <p>{ error }</p>

                    <Link
                        href="/datasets"
                        className={ classes.authorizationButton }
                    >
                        Go to dashboard
                    </Link>
                </div>
            </ActionPopup>
        );
    }

    if (!authorizationInstance) return <LoadingScreen />;

    return (
        <ActionPopup
            popupTitle="Sign in to Flockfysh"
            blurBg={ false }
            className={ classes.authContainerOuter }
        >
            <div className={ classes.authContainerInner }>
                <div className={ classes.appDetails }>
                    <div className={ classes.appLogo } />
                    <h2 className={ classes.appName }>
                        { authorizationInstance.client.name }
                    </h2>
                    <p>wants to:</p>
                </div>

                <ul className={ classes.permissionList }>
                    { authorizationInstance.scope.map(
                        function generatePermissionItem(scope, index) {
                            if (PERMISSION_MAPPING[scope]) {
                                const permObject = PERMISSION_MAPPING[scope];

                                return (
                                    <PermissionItem
                                        description={ permObject.description }
                                        icon={ permObject.Icon }
                                        key={ index }
                                    />
                                );
                            }

                            return <></>;
                        }
                    ) }
                </ul>

                <div className={ classes.authorizationButtons }>
                    <button
                        className={ `${classes.authorizationButton} ${classes.rejectAuthorizationButton}` }
                        onClick={ async (e) => {
                            e.preventDefault();
                            await authorize('reject');
                        } }
                    >
                        Reject
                    </button>

                    <button
                        className={ classes.authorizationButton }
                        onClick={ async (e) => {
                            e.preventDefault();
                            await authorize('approve');
                        } }
                    >
                        Approve
                    </button>
                </div>
            </div>
        </ActionPopup>
    );
}
