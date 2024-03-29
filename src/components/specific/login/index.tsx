import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { ReactSVG } from 'react-svg';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';

import ActionPopup from '../../ui/modals/actionPopup';
import LoginForm from './form';

import { UserContext } from '@/contexts/userContext';

import { getBackendUrl } from '@/helpers/url';

import google from '@/icons/providers/google.svg';
import github from '@/icons/providers/github.svg';

import classes from './styles.module.css';
import TextInput from '@/components/ui/input/textInput';
import { AUTH_SERVER_URL, SERVER_URL } from '@/settings';
import Auth from '@/helpers/auth';
import api from '@/helpers/api';
import { formToJSON } from 'axios';
import { toast } from 'react-toastify';

function Separator() {
    return (
        <div className={ classes.separatorContainer }>
            <span className={ classes.sepLine } />
            <span className={ classes.sepOr }>OR</span>
            <span className={ classes.sepLine } />
        </div>
    );
}

function OAuthLink(props: {
    icon: StaticImageData;
    provider: string;
    mode: 'signup' | 'login';
    onClick?: (url: string) => void;
    className?: string;
}) {
    const url = getBackendUrl(`/api/auth/${props.provider.toLowerCase()}`);

    return (
        <Link
            href={ url }
            onClick={ (e) => {
                e.preventDefault();
                props.onClick?.(url);
            } }
            className={ `${classes.oAuthBtn} ${
                props.className ? props.className : ''
            }` }
        >
            <ReactSVG src={ props.icon.src } />

            <span>
                { props.mode === 'login' ? 'Sign in' : 'Sign up' } with{ ' ' }
                { props.provider }
            </span>
        </Link>
    );
}

export default function Login(props: {
    mode: 'login' | 'signup';
    onClose: () => void;
}) {
    const router = useRouter();

    const isVerifying = router.query.status === 'verifying';

    const { user, refreshUser, getUser } = useContext(UserContext);

    const [mode, updateMode] = useState((router.query.mode as typeof props.mode)??props.mode);
    const [isOtp, setIsOtp] = useState(false);
    const [qr, setQr] = useState<string>();
    const [provider, setProvider] = useState<'google'|'github'|null>(null);
    
    const userRef = useRef<User|null>(null);
    const checkingAuth = useRef(false);


    const redirect = useCallback(
        function redirect() {
            const { code } = router.query;
            if (code) router.push(`/authorize?code=${code}`).then();
            // if (router.asPath !== router.pathname) {
                // router.replace(`/marketplace`).then();
            // }
//  else router.replace(router.asPath).then();
        },
        [router]
    );

    // check if has current user and no 2fa logout
    const checkAuth = async () => {
        const [data, hasAuth] =  await Promise.all([getUser(), Auth.has2FA()]);
        
        if(data && !hasAuth){
            await api.get('/api/auth/logout');
        }

        if(data && hasAuth){
            router.replace('/marketplace');
        }
    };

    const isLogin = mode === 'login';

    const curPopup = useRef<Window | null>(null);

    useEffect(() => {
        if (user) {
            redirect();
        }
    }, [user, redirect]);

    useEffect(() => {

        checkAuth();
    
    }, []);
    

    const altMode = mode === 'signup'?'login':'signup';
    const switchToOTP = (val:boolean) => {
        setIsOtp(val);
    };

    const openDash = () => {
        router.replace('/marketplace');
    }; 

    const handleError = (val:string) => {
        toast.error(val);
    };

    const onOTPProviderAuth = useCallback(async (form:HTMLFormElement, errCb?:(val:string)=>void) => {
        try {
            const formData = formToJSON(form) as {otp:string};
            const { data } = await api.post<{success:boolean, data:string}>('/api/auth/2fa', { email:userRef.current?.email, otp:formData.otp });

            if(data.success){
                refreshUser();
                openDash();
            }
else throw new Error (data.data);

        }
 catch (error) {
            if(errCb){
                errCb((error as Error).message);
            }
        }
        
    },
        [],
    );

    function oAuthLogin(path: string) {
        
        userRef.current = null;
        checkingAuth.current = false;
        // Don't open too many auth windows.
        if (curPopup.current) curPopup.current.close();

        const urlSegments = path.split('/');
        const authProvider = urlSegments[urlSegments.length-1] as typeof provider;
        setProvider(authProvider);

        const popup = window.open(path, '_blank');

        if (popup) {
            curPopup.current = popup;

            window.addEventListener('message', async function goToDashboard(e) {
                if(checkingAuth.current) return;
                checkingAuth.current = true;
                if(!userRef.current) {
                    if([AUTH_SERVER_URL, SERVER_URL].includes(e.origin)){
                        const hasAuth = await Auth.has2FA();
                        let showOTP = true;
                        if (e.data.success) {
                            curPopup.current?.close();
                            const userData = await getUser();
                            userRef.current = userData;
                            if(userData && ((hasAuth===null)||!isLogin)){
                                const res = await Auth.generateOTP(userData.email, handleError);
                                if(res?.success){
                                    setQr(res.data);
                                }
else{
                                    setProvider(null);
                                    showOTP = false;
                                }
                            }
                            showOTP && setIsOtp(true);
                        }
else if (!e.data.success) {
                            setProvider(null);
                            !curPopup.current?.closed && curPopup.current?.close();
                            window.removeEventListener('message', () => {});
                            throw new Error(e.data.message);
                        }
                        window.removeEventListener('message', () => {});
                    }
 else if (!e.data.success) {
                        !popup.closed && popup?.close();
                        window.removeEventListener('message', () => {});
                        throw new Error(e.data.message);
                    } 
                    window.removeEventListener('message', () => {});

                }
            });
        }
    }

    if(isVerifying)return(
<ActionPopup
    blurBg={ true }
    modalClassName={ classes.modal }
    popupTitle={ 'Auth Verification' }
    onClose={ props.onClose }
    >
        <div className={ `${classes.verification}` }>
            <TextInput label="Please enter your OTP" />
        </div>
    </ActionPopup>
);

    return (
        <ActionPopup
            blurBg={ true }
            modalClassName={ classes.modal }
            popupTitle={ isOtp? 'Verification': (isLogin ? 'Sign in' : 'Sign Up') }
            onClose={ props.onClose }
        >
            <section className={ classes.modalContent }>
                {
                    !isOtp && (
<>
                        <div className={ classes.oAuthContainer }>
                            <OAuthLink
                                icon={ google }
                                provider="Google"
                                mode={ mode }
                                onClick={ oAuthLogin }
                            />

                            <OAuthLink
                                icon={ github }
                                provider="GitHub"
                                mode={ mode }
                                onClick={ oAuthLogin }
                                className={ classes.githubIcon }
                            />
                        </div>

                        <Separator />
                    </>
)
                }
                <LoginForm 
                    mode={ mode }
                    onSubmit={ provider ? onOTPProviderAuth : undefined } 
                    qr={ qr??null } 
                    switchToOTP={ switchToOTP } 
                    isOTP={ isOtp } 
                    redirect={ openDash } 
                />

                { isLogin ? (
                    !isOtp&&(
<p className={ classes.changeType }>
                        Don&apos;t have an account?
                        <Link
                            href={ {
                                pathname:'/login',
                                query: qr?{ mode:altMode, qr }:{ mode:altMode }
                            } }
                            className={ classes.changeTypeButton }
                            onClick={ () => updateMode('signup') }
                        >
                            Sign up
                        </Link>
                        instead.
                    </p>
)
                ) : (!isOtp&&(
<>
                    {
                        <p className={ classes.changeType }>
                            Already have an account?
                            <Link
                                href={ {
                                    pathname:'/login',
                                    query: { mode:altMode }
                                } }
                                className={ classes.changeTypeButton }
                                onClick={ () => updateMode('login') }
                            >
                                Sign in
                            </Link>
                            instead.
                        </p>
                    }
                    </>
)
                ) }

                <p className={ classes.footer }>
                    By signing in you agree to our{ ' ' }
                    <Link href="/terms">Terms & Conditions.</Link>
                </p>
            </section>
        </ActionPopup>
    );
}
