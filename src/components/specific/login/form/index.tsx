import classes from './styles.module.css';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';

const LoginField = React.forwardRef<HTMLInputElement, {
    validationHandler: (data: any) => string | null,
    errorMessage?: string,
    type?: string,
    placeholder?: string,
    name?: string,
}>(function LoginField(props, ref) {
    return (
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
            onChange={ (e) => props.validationHandler(e.currentTarget.value) }
            type={ props.type }
        />
    );
});
export default function LoginForm(props: {
    mode: 'signup' | 'login'
}) {
    const [nameError, setNameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');

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


    return (
        <form className={ classes.loginForm }>
            <fieldset className={ classes.loginFieldset }>
                <h2 className={ classes.loginFormHeading }>Welcome back! Please enter your details.</h2>
                <LoginField placeholder={ 'Email' } type={ 'email' } name={ 'email' } errorMessage={ emailError }
                            validationHandler={ emailHandler }/>
                <LoginField placeholder={ 'Password' } type={ 'password' } name={ 'password' } errorMessage={ passwordError }
                            validationHandler={ passwordHandler }/>
                {
                    props.mode === 'signup' ? (
                        <LoginField placeholder={ 'Full name' } type={ 'text' } name={ 'fullName' } errorMessage={ emailError }
                                    validationHandler={ emailHandler }/>
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
            <Link href={ '/api/auth/signIn' } className={ classes.signIn }>Sign In</Link>
        </form>
    );
}
