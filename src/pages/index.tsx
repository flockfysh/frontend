import { useState } from 'react';
import LoginSignupPopup from '../components/loginSignupPopup/loginSignupPopup';

export default function Home() {
    const [isLoggingIn, updateLogging] = useState(true);

    return (
        <>
            <h1>Homepage</h1>
            <button onClick={ () => updateLogging(true) }>Login</button>

            {
                isLoggingIn && <LoginSignupPopup />
            }  
        </>
    );
}
