import Link from 'next/link';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';

import { formToJSON } from 'axios';
import { z, ZodError } from 'zod';

import { UserContext } from '@/contexts/userContext';

import { ApiError } from '@/helpers/errors';

import Auth from '@/helpers/auth';
import phone from '@/icons/main/smartphone.svg';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import classes from './styles.module.css';

const LoginField = forwardRef<
    HTMLInputElement,
    {
        errorMessage?: string;
        type?: string;
        placeholder?: string;
        name?: string;
    }
>(function LoginField(props, ref) {
    return (
        <label className={ classes.field }>
            <input
                ref={ (e) => {
                    if (typeof ref === 'function') ref(e);
                    else if (ref) ref.current = e;
                } }
                name={ props.name }
                placeholder={ props.placeholder }
                className={ `${props.errorMessage ? classes.inputInvalid : ''} ${
                    classes.input
                }` }
                type={ props.type }
            />

            { props.errorMessage ? (
                <span className={ classes.error }>{ props.errorMessage }</span>
            ) : (
                ''
            ) }
        </label>
    );
});

export default function LoginForm(props: {
    mode: 'signup' | 'login';
    isOTP: boolean,
    qr:string|null,
    switchToOTP?: (val:boolean)=>void,
    redirect: () => void;
    onSubmit?: (form:HTMLFormElement, errCb?:(val:string)=>void) => void;
}) {
    const { refreshUser, getUser } = useContext(UserContext);
    const { push, pathname, ...router } = useRouter();
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState<string>();
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [formMode, setFormMode] = useState((router.query.mode as typeof props.mode)??props.mode);
    const [otpMode, setOtpMode] = useState(false);

    const qrImage = useRef<string|null>((router.query.qr as string)??props.qr??null);
    const userData = useRef<User>();

    const isLogin = props.mode === 'login';

useEffect(() => {

    setOtpMode(props.isOTP);

}, [props.isOTP]);

useEffect(() => {
    if(props.qr){
    
        qrImage.current = props.qr;

    }
}, [props.qr]);



    useEffect(() => {
        if(props.isOTP){
            if(isLogin){
                push(pathname, { query:{ mode:props.mode } });
            }
 else {
                push(pathname, { query:{ mode:props.mode } });
            }
        }
//         if(props.isOTP){
//             push(pathname, { query:{ mode:props.mode, qr:qrImage.current } });
//         }
//  else if(!isLogin){
//             push(pathname, { query:{ mode:props.mode } });
//         }

        setFormMode(props.mode);

    }, [isLogin, props.isOTP, pathname]);

    const onFindOTP = async () => {
        const user = await getUser();
        if(user?.email||userData.current?.email){
            const errCb = (val:string) => {
                val&&toast.error(val);
            };
            toast.info('Sending OTP reset link...');

            const res = await Auth.forgot2fa(user?.email!??userData.current?.email, errCb);
            if(res){
                toast.success('Please check your mail for your OTP reset link.');
            }
        }
    };

    function handleError(val:string){
        toast.error(val);
    }

    function handleFormErr(val:string){
        toast.error(val);
    }

    function handleValid(elem: HTMLFormElement) {
        let formValid = true;

        const properties = formToJSON(elem) as {
            fullName?: string;
            email: string;
            password: string;
            confirmPassword?: string;
            otp?:string
        };

        if(otpMode){
            try {
                z.string({
                    required_error:'Missig OTP code',
                    invalid_type_error: 'OTP must be a string'
                })
                .nonempty('Missing OTP')
                .length(6, 'OTP should be 6 characters')
                .parse(properties.otp);

                setOtpError(undefined);

            }
 catch (e) {

                formValid=false;
                if (e instanceof ZodError) setOtpError(e.issues[0].message);

            }
            
        }
else{
            try {
                z.string({
                    // eslint-disable-next-line camelcase
                    required_error: 'Missing email.',
                    // eslint-disable-next-line camelcase
                    invalid_type_error: 'Email must be a string.',
                })
                    .nonempty('Missing email.')
                    .email('Email is invalid.')
                    .parse(properties.email);
    
                setEmailError('');
            }
     catch (e) {
                formValid = false;
    
                if (e instanceof ZodError) setEmailError(e.issues[0].message);
                else throw e;
            }
    
            try {
                z.string({
                    // eslint-disable-next-line camelcase
                    required_error: 'Missing password.',
                    // eslint-disable-next-line camelcase
                    invalid_type_error: 'Password must be a string.',
                })
                    .min(8, 'The password must be at least 8 characters long.')
                    .parse(properties.password);
    
                setPasswordError('');
            }
     catch (e) {
                formValid = false;
    
                if (e instanceof ZodError) setPasswordError(e.issues[0].message);
            }
    
            if (formMode === 'signup') {
                try {
                    z.string({
                        // eslint-disable-next-line camelcase
                        required_error: 'Missing display name.',
                        // eslint-disable-next-line camelcase
                        invalid_type_error: 'Display name must be a string.',
                    })
                        .nonempty('Missing display name.')
                        .parse(properties.fullName);
    
                    setNameError('');
                }
     catch (e) {
                    formValid = false;
    
                    if (e instanceof z.ZodError) setNameError(e.issues[0].message);
                }
    
                if (properties.password !== properties.confirmPassword) {
                    formValid = false;
                    setConfirmPasswordError('Passwords do not match.');
                }
     else setConfirmPasswordError('');
            }
        }

        
        return formValid;
    }

    async function auth(form: HTMLFormElement, mode: 'signup' | 'login') {

        try {
            const data:any = await formToJSON(form);
            if (!otpMode){
                if(!isLogin){
                    const res = await Auth.generateOTP(data.email, handleError);
                    if(res?.success){
                        qrImage.current = res.data;
                        props.switchToOTP && props.switchToOTP(true);
                    }
                }
else{
                    props.switchToOTP && props.switchToOTP(true);
                }
                userData.current = data;
            }
 else {
                const result = await Auth.login(mode, { ...userData.current, ...data }, handleError);
                
                if(result){
                    refreshUser();
                    props.redirect();
                }

            }
        }
 catch (e) {
            if (e instanceof ApiError) {
                const ERROR_MAPPING: Record<string, () => void> = {
                    ERROR_USER_EXISTS: () =>
                        setEmailError(
                            'This email has already been registered.'
                        ),
                    ERROR_MISSING_NAME: () =>
                        setNameError('Display name is missing.'),
                    ERROR_INVALID_EMAIL: () =>
                        setEmailError('Email is not valid.'),
                    ERROR_INVALID_PASSWORD: () =>
                        setPasswordError('Password is not valid.'),
                    ERROR_OAUTH_ACCOUNT_WITHOUT_PASSWORD: () =>
                        setPasswordError(
                            'Please try logging in with Google or GitHub.'
                        ),
                    ERROR_INVALID_CREDENTIALS: () =>
                        setPasswordError(
                            'Username or password is not correct.'
                        ),
                };

                ERROR_MAPPING[e.code]?.();
            }
 else throw e; // TODO: I don't think this is handled
        }
    }
    
    return (
        <form
            className={ classes.loginForm }
            onChange={ (e) => {
                handleValid(e.currentTarget);
            } }
            onSubmit={ (e) => {
                e.preventDefault();
                if (handleValid(e.currentTarget))
                    if(props.onSubmit){
                        props.onSubmit(e.currentTarget, handleError);
                    }
 else{
    console.log('Calling auth'); 
    auth(e.currentTarget, formMode).then();
}
            } }
        >
            { !otpMode
            ? (
<fieldset className={ classes.loginFieldset }>
                <h2 className={ classes.loginFormHeading }>
                    Please enter your information
                </h2>

                { formMode === 'signup' ? (
                    <LoginField
                        placeholder="Full name"
                        type="text"
                        name="fullName"
                        errorMessage={ nameError }
                    />
                ) : (
                    <></>
                ) }

                <LoginField
                    placeholder="Email"
                    type="email"
                    name="email"
                    errorMessage={ emailError }
                />

                <LoginField
                    placeholder="Password"
                    type="password"
                    name="password"
                    errorMessage={ passwordError }
                />

                { formMode === 'signup' ? (
                    <LoginField
                        placeholder="Confirm password"
                        type="password"
                        name="confirmPassword"
                        errorMessage={ confirmPasswordError }
                    />
                ) : (
                    <></>
                ) }

                <div className={ classes.signInUtilities }>
                    <label className={ classes.label }>
                        <input
                            type="checkbox"
                            name="rememberUser"
                            className={ classes.checkbox }
                        />

                        <span>Remember Me</span>
                    </label>

                    <Link
                        href="/forgot-password"
                        className={ classes.forgotPassword }
                    >
                        Forgot Password?
                    </Link>
                </div>
            </fieldset>
)
            :(
<fieldset className={ classes.qrContainer }>
                <div>
                    <p className={ classes.label }>{ 
                    !isLogin
                    ? 'Please scan the QR code and enter your OTP'
                    : 'Please enter OTP from your authentication app'
                }</p>
                    <LoginField
                        placeholder="OTP"
                        type="Please enter your verification OTP"
                        name="otp"
                        errorMessage={ otpError }
                    />
                    { qrImage.current?(
<div className={ classes.qrImgContainer }>
                        <img className={ classes.qrImage } src={ qrImage.current } />
                    </div>
):(
<>
    <ReactSVG stroke="white" fill="white" className={ classes.phone } src={ phone.src }/>
    <Link href={ '#' } onClick={ onFindOTP } className={ classes.findOtp }>Can't find OTP?</Link>
</>
) }
                    
                </div>
            </fieldset>
) }
            <button className={ classes.signIn }>
                { otpMode ? 'Submit': (formMode === 'login' ? 'Sign in' : 'Sign up') }
            </button>
        </form>
        
    );
}
