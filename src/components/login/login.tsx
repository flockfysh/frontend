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
        <div className={ classes.separator }>
            <span>OR</span>
        </div>
    );
}

export default function Login() {
    const [isLogin, updateIsLogin] = useState(true);

    return (
        <ActionPopup blurBg={ true }>
            <div className={ classes.header }>
                <ReactSVG src={ xMark } />

                <h1>{ isLogin ? 'Sign In' : 'Sign Up' }</h1>
            </div>

            <div className={ classes.oAuthContainer }>
                <button className={ classes.oAuthBtn }>
                    <ReactSVG src={ google } /> { isLogin ? 'Sign In' : 'Sign Up' } with Google
                </button>

                <button className={ classes.oAuthBtn }>
                    <ReactSVG src={ github } /> { isLogin ? 'Sign In' : 'Sign Up' } with GitHub
                </button>
            </div>

            <Separator />

        </ActionPopup>
    );
}
