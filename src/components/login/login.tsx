import { useState } from 'react';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

import xMark from '@/icons/xmark.svg';
import google from '@/icons/providers/google.svg';
import github from '@/icons/providers/github.svg';

import ActionPopup from '../modals/actionPopup/actionPopup';

import classes from './login.module.css';

function Separator() {
    return (
        <div className={ classes.separatorContainer }>
            <span className={ classes.sepLine }></span>
            <span className={ classes.sepOr }>OR</span>
            <span className={ classes.sepLine }></span>
        </div>
    );
}

export default function Login() {
    const [isLogin, updateIsLogin] = useState(true);

    return (
        <ActionPopup blurBg={ true }>
            <div className={ classes.header }>
                <ReactSVG className={ classes.closeBtn } src={ xMark.src } />

                <h1>{ isLogin ? 'Sign In' : 'Sign Up' }</h1>
            </div>

            <div className={ classes.oAuthContainer }>
                <button className={ classes.oAuthBtn }>
                    <ReactSVG className={ classes.icon } src={ google.src } /> { isLogin ? 'Sign In' : 'Sign Up' } with Google
                </button>

                <button className={ classes.oAuthBtn }>
                    <ReactSVG className={ classes.icon } src={ github.src } /> { isLogin ? 'Sign In' : 'Sign Up' } with GitHub
                </button>
            </div>

            <Separator />

            <div className={ classes.secondLoginContainer }>
                <p>Welcome back! Please enter your login information.</p>

                {
                    isLogin ? (
                        <>
                            <input type="email" placeholder="Your email" />
                            <input type="password" placeholder="Your password" />
                        </>
                    ) : (
                        <>
                            <input type="text" placeholder="Your username" />
                            <input type="email" placeholder="Your email" />
                            <input type="password" placeholder="Your password" />
                            <input type="password" placeholder="Retype password" />
                        </>
                    )
                }

                <div className={ classes.bottomContainer }>
                    <div className={ classes.rememberMeContainer }>
                        <label>
                            <input type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                    </div>
                    

                    <p className={ classes.forgotPassword }>Forgot Password?</p>
                </div>

                <button className={ classes.submitBtn }>{ isLogin ? 'Sign In' : 'Sign Up' }</button>

                {
                    isLogin ? (
                        <p className={ classes.changeType }>
                            Don't have an account? <span onClick={ () => updateIsLogin(false) }>Sign Up</span> instead.
                        </p>
                    ) : (
                        <p className={ classes.changeType }>
                            Already have an account? <span onClick={ () => updateIsLogin(true) }>Sign In</span> instead.
                        </p>
                    )
                }

                <p className={ classes.footer }>
                    By signing in you agree to our <Link href="/terms">Terms & Conditions.</Link>
                </p>
            </div>
        </ActionPopup>
    );
}
