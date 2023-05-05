import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import classes from './loginSignupPopup.module.css';

export default function LoginSignupPopup() {
    const [isLogin, updateIsLogin] = useState(true);

    return (
        <div className={ classes.container }>
            <button className={ classes.closeBtn }>
                <IoMdClose />
            </button>

            <h1>{ isLogin ? 'Sign In' : 'Sign Up' }</h1>
        </div>
    );
}
