import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import classes from './loginSignupPopup.module.css';

export default function LoginSignupPopup() {
    const [isLogin, updateIsLogin] = useState(true);

    return (
        <div className={ classes.container }>
            <div className={ classes.contentContainer }>
                <div className={ classes.headerSection }>
                    <button>
                        <IoMdClose className={ classes.closeIcon } />
                    </button>

                    <h1>{ isLogin ? 'Sign In' : 'Sign Up' }</h1>
                </div>
                
                <div>
                    <button>{ isLogin ? 'Sign In' : 'Sign Up' } with Google</button>
                    <button>{ isLogin ? 'Sign In' : 'Sign Up' } with GitHub</button>

                    <span></span>



                </div>
            </div>
        </div>
    );
}
