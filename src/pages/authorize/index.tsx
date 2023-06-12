import pen from '@/icons/main/pen-tool.svg';
import eye from '@/icons/main/eye.svg';
import share from '@/icons/main/share.svg';
import user from '@/icons/main/user.svg';
import { StaticImageData } from 'next/image';
import { ReactSVG } from 'react-svg';
import React from 'react';
import api from '@/helpers/api';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { LoadingScreen } from '@/components/ui/loading/loading';
import classes from './styles.module.css';
import ActionPopup from '@/components/ui/modals/ActionPopup';
import { useRouter } from 'next/router';

type AuthorizationFeedback = 'reject' | 'approve';

const PERMISSION_MAPPING: Record<string, { description: string, Icon: StaticImageData }> = {
    'write_dataset': {
        description: 'Create, provide feedback and delete datasets as well as pull requests',
        Icon: pen,
    },
    'read_dataset': {
        description: 'Read datasets and access images',
        Icon: eye,
    },
    'manage_dataset': {
        description: 'Share your datasets to other accounts and edit/delete datasets',
        Icon: share,
    },
    'manage_account': {
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

function PermissionItem(props: { description: string, icon: StaticImageData }) {
    return (
        <li className={ classes.permissionItem }>
            <ReactSVG src={ props.icon.src } className={ classes.permissionIcon }></ReactSVG>
            <p>
                {props.description}
            </p>
        </li>
    );
}

export default function Authorize() {
    const code = new URL(window.location.href).searchParams.get('code');
    const router = useRouter();
    const [authorizationInstance, setAuthorizationInstance] = React.useState<AuthorizationInstance | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
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
    }, [code]);

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
            router.push(`/datasets`);
        }
 catch (e) {
            if (e instanceof AxiosError) setError(e.response?.data.error.message);
        }
    }

    if (error) {
        return (
            <ActionPopup popupTitle={ 'Sign in to Flockfysh' } blurBg={ true } onClose={ () => {
                router.push(`/datasets`).then();
            } } className={ classes.authContainerOuter }>
                <div className={ classes.authContainerInner }>
                    <h2 className={ classes.errorHeading }>Authorization error</h2>
                    <p>{error}</p>
                    <Link href={ '/datasets' } className={ classes.authorizationButton }>Go to dashboard</Link>
                </div>
            </ActionPopup>
        );
    }

    if (!authorizationInstance) return <LoadingScreen/>;

    return (
        <ActionPopup popupTitle={ 'Sign in to Flockfysh' } blurBg={ false } className={ classes.authContainerOuter }>
            <div className={ classes.authContainerInner }>
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
                                <PermissionItem description={ permObject.description } icon={ permObject.Icon }
                                                key={ index }/>
                            );
                        }
                        return <></>;
                    })}
                </ul>
                <div className={ classes.authorizationButtons }>
                    <button className={ `${classes.authorizationButton} ${classes.rejectAuthorizationButton}` }
                            onClick={ async e => {
                                e.preventDefault();
                                await authorize('reject');
                            } }>Reject
                    </button>
                    <button className={ classes.authorizationButton } onClick={ async e => {
                        e.preventDefault();
                        await authorize('approve');
                    } }>Approve
                    </button>
                </div>
            </div>
        </ActionPopup>
    );
}
