import classes from './styles.module.css';
import Link from 'next/link';
import React from 'react';
import { z, ZodError } from 'zod';
import { formToJSON } from 'axios';
import { UserContext } from '@/contexts/userContext';
import api from '@/helpers/api';
import { ApiError } from '@/helpers/errors';

const LoginField = React.forwardRef<HTMLInputElement, {
    errorMessage?: string,
    type?: string,
    placeholder?: string,
    name?: string,
}>(function LoginField(props, ref) {
    return (
        <label className={ classes.field }>
            <input
                ref={ (e) => {
                    if (typeof ref === 'function') {
                        ref(e);
                    }
 else if (ref) {
                        ref.current = e;
                    }
                } }
                name={ props.name }
                placeholder={ props.placeholder }
                className={ `${props.errorMessage ? classes.inputInvalid : ''} ${classes.input}` }
                type={ props.type }
            />
            {props.errorMessage ? <span className={ classes.error }>{props.errorMessage}</span> : ''}
        </label>
    )
        ;
});
export default function LoginForm(props: {
    mode: 'signup' | 'login',
    redirect: () => void,
}) {
    const { refreshUser } = React.useContext(UserContext);
    const [nameError, setNameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    function handleValid(elem: HTMLFormElement) {
        let formValid = true;
        const properties = formToJSON(elem) as {
            fullName?: string,
            email: string,
            password: string,
            confirmPassword?: string,
        };
        try {
            z.string({
                required_error: 'Missing email.',
                invalid_type_error: 'Email must be a string.',
            }).nonempty('Missing email.').email('Email is invalid.').parse(properties.email);
            setEmailError('');
        }
 catch (e) {
            formValid = false;
            if (e instanceof ZodError) {
                setEmailError(e.issues[0].message);
            }
 else throw e;
        }
        try {
            z.string({
                required_error: 'Missing password.',
                invalid_type_error: 'Password must be a string.',
            })
                .min(8, 'The password must be at least 8 characters long.')
                .parse(properties.password);
            setPasswordError('');
        }
 catch (e) {
            formValid = false;
            if (e instanceof ZodError) {
                setPasswordError(e.issues[0].message);
            }
        }
        if (props.mode === 'signup') {
            try {
                z.string({
                    required_error: 'Missing display name.',
                    invalid_type_error: 'Display name must be a string.',
                }).nonempty('Missing display name.').parse(properties.fullName);
                setNameError('');
            }
 catch (e) {
                formValid = false;
                if (e instanceof z.ZodError) {
                    setNameError(e.issues[0].message);
                }
            }
            if (properties.password !== properties.confirmPassword) {
                formValid = false;
                setConfirmPasswordError('Passwords do not match.');
            }
 else {
                setConfirmPasswordError('');
            }
        }
        return formValid;
    }

    async function auth(form: HTMLFormElement, mode: 'signup' | 'login') {
        try {
            const data = await formToJSON(form);
            await api.post(`/api/auth/${mode}`, data);
            refreshUser();
            props.redirect();
        }
 catch (e) {
            if (e instanceof ApiError) {
                const ERROR_MAPPING: Record<string, () => void> = {
                    'ERROR_USER_EXISTS': () => setEmailError('This email has already been registered.'),
                    'ERROR_MISSING_NAME': () => setNameError('Display name is missing.'),
                    'ERROR_INVALID_EMAIL': () => setEmailError('Email is not valid.'),
                    'ERROR_INVALID_PASSWORD': () => setPasswordError('Password is not valid.'),
                    'ERROR_OAUTH_ACCOUNT_WITHOUT_PASSWORD': () => setPasswordError('Please try logging in with Google or GitHub.'),
                    'ERROR_INVALID_CREDENTIALS': () => setPasswordError('Username or password is not correct.'),
                };
                ERROR_MAPPING[e.code]?.();
            }
 else {
                throw e;
            }
        }
    }

    return (
        <form className={ classes.loginForm } onChange={ e => {
            handleValid(e.currentTarget);
        } } onSubmit={ e => {
            e.preventDefault();
            if (handleValid(e.currentTarget)) {
                auth(e.currentTarget, props.mode).then();
            }
        } }>
            <fieldset className={ classes.loginFieldset }>
                <h2 className={ classes.loginFormHeading }>Welcome back! Please enter your sign up or login
                    information.</h2>
                {
                    props.mode === 'signup' ? (
                        <LoginField placeholder={ 'Full name' } type={ 'text' } name={ 'fullName' }
                                    errorMessage={ nameError }/>
                    ) : <></>
                }
                <LoginField placeholder={ 'Email' } type={ 'email' } name={ 'email' } errorMessage={ emailError }/>
                <LoginField placeholder={ 'Password' } type={ 'password' } name={ 'password' }
                            errorMessage={ passwordError }/>
                {
                    props.mode === 'signup' ? (
                        <LoginField placeholder={ 'Confirm password' } type={ 'password' } name={ 'confirmPassword' }
                                    errorMessage={ confirmPasswordError }/>
                    ) : <></>
                }
                <div className={ classes.signInUtilities }>
                    <label className={ classes.label }>
                        <input type={ 'checkbox' } name={ 'rememberUser' } className={ classes.checkbox }/>
                        <span>Remember Me</span>
                    </label>
                    <Link href={ '/forgotPassword' } className={ classes.forgotPassword }>Forgot Password?</Link>
                </div>
            </fieldset>
            <button className={ classes.signIn }>{props.mode === 'login' ? 'Sign in' : 'Sign up'}</button>
        </form>
    );
}
