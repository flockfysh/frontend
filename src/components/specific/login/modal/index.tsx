import xMark from '@/icons/xmark.svg';
import google from '@/icons/providers/google.svg';
import github from '@/icons/providers/github.svg';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { StaticImageData } from 'next/image';
import React from 'react';
import { getBackendUrl } from '@/helpers/url';
import classes from './styles.module.css';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/userContext';
import LoginForm from '@/components/specific/login/form';

function OAuthLink(props: {
    icon: StaticImageData;
    provider: string;
    onClick?: (url: string) => void;
    children?: React.ReactNode;
}) {
    const url = getBackendUrl(`/api/auth/${props.provider.toLowerCase()}`);

    return (
        <Link href={ url } onClick={ e => {
            e.preventDefault();
            props.onClick?.(url);
        } } className={ classes.oAuthLink }>
            <ReactSVG src={ props.icon.src }></ReactSVG>
            <span>Sign in with {props.provider}</span>
        </Link>
    );
}

function Separator() {
    return (
        <div className={ classes.separator }>
            <span className={ classes.separatorText }>OR</span>
        </div>
    );
}


export default function LoginModal(props: {
    mode: 'signup' | 'login'
}) {
    const curPopup = React.useRef<Window | null>(null);
    const router = useRouter();
    const { curUser, refresh } = React.useContext(UserContext);

    React.useEffect(() => {
        if (curUser) {
            const code = router.query.code;
            if (!code) {
                router.replace('/dashboard').then();
            }
 else {
                router.replace(`/authorize?code=${code}`).then();
            }
        }
    }, [curUser, router]);

    function redirect() {
        const code = router.query.code;
        if (code !== null) {
            router.push(`/authorize?code=${code}`).then();
        }
 else {
            router.push('/dashboard').then();
        }
    }

    function oAuthLogin(path: string) {
        // Don't open too many auth windows.
        if (curPopup.current) curPopup.current.close();
        const popup = window.open(path, '_blank');
        if (popup) {
            curPopup.current = popup;

            window.addEventListener('message', function goToDashboard(e) {
                if (e.data.success) {
                    popup.close();
                    refresh();
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
        <div className={ classes.container }>
            <div className={ classes.header }>
                <Link className={ classes.closeButton } href={ '/' }>
                    <ReactSVG className={ classes.icon } src={ xMark.src }></ReactSVG>
                </Link>
                <h1 className={ classes.heading }>{props.mode === 'login' ? 'Sign In' : 'Sign Up'}</h1>
            </div>
            <div className={ classes.forms }>
                <section className={ classes.quickSignIn }>
                    <div className={ classes.quickSignInDesc }>
                        <p className={ classes.highlight }>If this is your first time, it will create a new account on
                            flockfysh.</p>
                        <p>By signing in you agree to our <Link href={ '/terms' }
                                                                className={ classes.toc }>Terms &amp; Conditions.</Link>
                        </p>
                    </div>
                    <div className={ classes.quickSignInOpts }>
                        <OAuthLink icon={ google } provider={ 'Google' } onClick={ oAuthLogin }></OAuthLink>
                        <OAuthLink icon={ github } provider={ 'GitHub' } onClick={ oAuthLogin }></OAuthLink>
                    </div>
                </section>
                <Separator></Separator>
                <LoginForm mode={ props.mode }></LoginForm>
            </div>
        </div>
    );
}
