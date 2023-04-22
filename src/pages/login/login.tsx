import React, { useState, useRef, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { serverURL } from '../../settings';

import LinkUnderline from '../../components/UI/linkUnderline/linkUnderline';

import { UserContext } from '../../contexts/userContext';
import { ErrorContext } from '../../contexts/errorContext';

import classes from './login.module.css';
import api from '../../helpers/api';
import { z } from 'zod';


const LoginField = React.forwardRef<HTMLInputElement, {
    validationHandler: (data: any) => string | null,
    errorMessage?: string,
    type?: string,
    label: string
}>((props, ref) => {
    return (
        <div>
            <label htmlFor="email" className={ classes.inputHeading }>
                {props.label}
            </label>

            <input
                ref={ (e) => {
                    if (typeof ref === 'function') {
                        ref(e);
                    }
                    else if (ref) {
                        ref.current = e;
                    }
                } }
                className={ `${props.errorMessage ? classes.inputInvalid : ''} ${classes.input}` }
                onChange={ (e) => props.validationHandler(e.currentTarget.value) }
                type={ props.type }
            />

            <span className={ `${props.errorMessage ? classes.inputInvalidTextActive : classes.inputInvalidText}` }>
                {props.errorMessage}
            </span>
        </div>
    );
});

export default function LoginForm(props: { type: string }) {
    const navigate = useNavigate();
    const curPopup = useRef<Window | null>(null);

    const { curUser, setUser, refresh } = useContext(UserContext);
    const { throwError } = useContext(ErrorContext);

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (curUser) {
        if (!code) {
            return <Navigate to="/dashboard" replace={ true }/>;
        }
        else {
            return <Navigate to={ `/authorize?code=${code}` } replace={ true }/>;
        }
    }

    function redirect() {
        if (code !== null) {
            navigate(`/authorize?code=${code}`);
        }
        else {
            navigate('/dashboard');
        }
    }

    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    /**
     * Open oAuth login Popup
     *
     * @param path Backend API route for login auth
     */
    function oAuthLogin(path: string) {
        // Don't open too many auth windows.
        if (curPopup.current) curPopup.current.close();

        const login = serverURL + path;
        const popup = window.open(login, '_blank');

        if (popup) {
            curPopup.current = popup;

            window.addEventListener('message', function goToDashboard(e) {
                if (e.data.success) {
                    popup.close();
                    refresh();
                    redirect();
                }
                else if (!e.data.success) {
                    throwError(e.data.message);
                    popup.close();
                }
            });
        }
    }

    function passwordHandler(password: unknown): string | null {
        try {
            const result = z.string({
                required_error: 'Missing password.',
                invalid_type_error: 'Password must be a string.',
            })
                .min(8, 'The password must be at least 8 characters long.')
                .parse(password);
            setPasswordError('');
            return result;
        }
 catch (e) {
            if (e instanceof z.ZodError) {
                setPasswordError(e.issues[0].message);
                return null;
            }
            throw e;
        }
    }

    function emailHandler(email: unknown): string | null {
        try {
            const result = z.string({
                required_error: 'Missing email.',
                invalid_type_error: 'Email must be a string.',
            }).nonempty('Missing email.').email('Email is invalid.').parse(email);
            setEmailError('');
            return result;
        }
 catch (e) {
            if (e instanceof z.ZodError) {
                setEmailError(e.issues[0].message);
                return null;
            }
            throw e;
        }
    }

    function nameHandler(name: unknown): string | null {
        try {
            const result = z.string({
                required_error: 'Missing display name.',
                invalid_type_error: 'Display name must be a string.',
            }).nonempty('Missing display name.').parse(name);
            setNameError('');
            return result;
        }
 catch (e) {
            if (e instanceof z.ZodError) {
                setNameError(e.issues[0].message);
                return null;
            }
            throw e;
        }
    }

    async function submitHandler() {
        if (props.type.toLowerCase() === 'signup') {
            const email = emailHandler(emailRef.current?.value),
                password = passwordHandler(passwordRef.current?.value),
                name = nameHandler(nameRef.current?.value);

            const response = (await api.post('/api/auth/signup', {
                email: email,
                password: password,
                fullName: name,
            })).data;
            setUser(response);
            redirect();
        }
        else {
            const email = emailHandler(emailRef.current?.value),
                password = passwordHandler(passwordRef.current?.value);

            const response = (await api.post('/api/auth/login', {
                email: email,
                password: password,
            })).data;
            setUser(response);
            redirect();
        }
    }

    return (
        <form className={ classes.form }>
            <div className={ classes.localLogin }>
                <div className={ classes.loginFields }>
                    {props.type.toLowerCase() === 'signup' ? (
                        <LoginField ref={ nameRef } errorMessage={ nameError } label={ 'Display name' }
                                    validationHandler={ nameHandler }></LoginField>
                    ) : <></>}
                    <LoginField type={ 'email' } ref={ emailRef } errorMessage={ emailError } label={ 'Email' }
                                validationHandler={ emailHandler }></LoginField>
                    <LoginField type={ 'password' } ref={ passwordRef } errorMessage={ passwordError } label={ 'Password' }
                                validationHandler={ passwordHandler }></LoginField>
                </div>

                {
                    props.type === 'Signup' ? (
                        <Link className={ classes.link } to="/login">
                            I already have an account
                        </Link>
                    ) : (
                        <Link className={ classes.link } to="/signup">
                            I don't have an account
                        </Link>
                    )
                }

                <button
                    type="button"
                    className={ classes.submitButton }
                    onClick={ submitHandler }
                >
                    {props.type}
                </button>

                <p className={ classes.terms }>
                    By {props.type === 'Signup' ? 'signing up' : 'logging in'}, you agree to the
                    <LinkUnderline className={ classes.termLinks } text="Terms of Use" to="/terms"/> and
                    <LinkUnderline className={ classes.termLinks } text="Privacy Policy" to="/privacy"/>.
                </p>
            </div>

            <div className={ classes.formSeparator }></div>

            <div className={ classes.buttonDiv }>
                <button
                    className={ `${classes.githubButton} ${classes.socialButton}` }
                    onClick={ () => oAuthLogin('/api/auth/github') }
                    type="button"
                >
                    {props.type} with Github{' '}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={ classes.githubIcon }
                        viewBox="0 0 512 512"
                    >
                        <title>Logo Github</title>

                        <path
                            d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/>
                    </svg>
                </button>

                <button
                    className={ `${classes.googleButton} ${classes.socialButton}` }
                    onClick={ () => oAuthLogin('/api/auth/google') }
                    type="button"
                >
                    {props.type} with Google{' '}
                    <svg
                        className={ classes.googleIcon }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <title>Logo Google</title>

                        <path
                            d="M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z"/>
                    </svg>
                </button>
            </div>
        </form>
    );
}
