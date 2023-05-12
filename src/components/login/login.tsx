import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

import classes from './login.module.css';

export default function Login() {
    const [isLogin, updateIsLogin] = useState(true);

    return (
        <div className={ classes.overlay }>
            <div className={ classes.container }>
                <div className={ classes.header }>
                    <GrClose />

                    <h1>{ isLogin ? 'Sign In' : 'Sign Up'}</h1>
                </div>
            </div>
        </div>
    );
}
