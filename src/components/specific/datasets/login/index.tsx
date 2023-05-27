import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';
import { ReactSVG } from 'react-svg';

import ActionPopup from '../../../ui/modals/actionPopup/actionPopup';
import LoginForm from './form';

import { UserContext } from '@/contexts/userContext';

import { getBackendUrl } from '@/helpers/url';

import xMark from '@/icons/xmark.svg';
import google from '@/icons/providers/google.svg';
import github from '@/icons/providers/github.svg';

import classes from './styles.module.css';

function Separator() {
    return (
        <div className={ classes.separatorContainer }>
            <span className={ classes.sepLine }/>
            <span className={ classes.sepOr }>OR</span>
            <span className={ classes.sepLine }/>
        </div>
    );
}

function OAuthLink(props: {
    icon: StaticImageData;
    provider: string;
    mode: 'signup' | 'login';
    onClick?: (url: string) => void;
}) {
    const url = getBackendUrl(`/api/auth/${props.provider.toLowerCase()}`);

    return (
        <Link
            href={ url }
            onClick={ e => {
                e.preventDefault();
                props.onClick?.(url);
            } }
            className={ classes.oAuthBtn }
        >
            <ReactSVG src={ props.icon.src }/>

            <span>{props.mode === 'login' ? 'Sign in' : 'Sign up'} with {props.provider}</span>
        </Link>
    );
}

export default function Login(props: {
    mode: 'login' | 'signup'
}) {
    const [mode, updateMode] = useState(props.mode);
    const isLogin = mode === 'login';
    const curPopup = useRef<Window | null>(null);
    const router = useRouter();
    const { user, refreshUser } = useContext(UserContext);


    const redirect = useCallback(function redirect() {
        const code = router.query.code;

        if (code) router.push(`/authorize?code=${code}`).then();
        else router.push('/dashboard').then();
    }, [router]);

    useEffect(() => {
        if (user) {
            redirect();
        }
    }, [redirect, user]);


    function oAuthLogin(path: string) {
        // Don't open too many auth windows.
        if (curPopup.current) curPopup.current.close();

        const popup = window.open(path, '_blank');

        if (popup) {
            curPopup.current = popup;

            window.addEventListener('message', function goToDashboard(e) {
                if (e.data.success) {
                    popup.close();
                    refreshUser();
                    redirect();
                }
 else if (!e.data.success) {
                    popup?.close();
                    throw new Error(e.data.message);
                }
            });
        }
    }

    return (
        <ActionPopup blurBg={ true } modalClassName={ classes.modal }>
            <div className={ classes.header }>
                <ReactSVG className={ classes.closeBtn } src={ xMark.src }/>

                <h1 className={ classes.headerText }>{isLogin ? 'Sign in' : 'Sign Up'}</h1>
            </div>

            <section className={ classes.modalContent }>
                <div className={ classes.oAuthContainer }>
                    <OAuthLink icon={ google } provider={ 'Google' } mode={ mode } onClick={ oAuthLogin }></OAuthLink>
                    <OAuthLink icon={ github } provider={ 'GitHub' } mode={ mode } onClick={ oAuthLogin }></OAuthLink>
                </div>

                <Separator/>

                <LoginForm mode={ mode } redirect={ redirect }/>

                {
                    isLogin ? (
                        <p className={ classes.changeType }>
                            Don't have an account? &nbsp;
                            <button
                                className={ classes.changeTypeButton }
                                onClick={ () => updateMode('signup') }
                            >
                                Sign up
                            </button>
                            instead.
                        </p>
                    ) : (
                        <p className={ classes.changeType }>
                            Already have an account? &nbsp;
                            <button
                                className={ classes.changeTypeButton }
                                onClick={ () => updateMode('login') }
                            >
                                Sign in
                            </button>
                            instead.
                        </p>
                    )
                }
                <p className={ classes.footer }>
                    By signing in you agree to our <Link href="/terms">Terms & Conditions.</Link>
                </p>
            </section>
        </ActionPopup>
    );
}
