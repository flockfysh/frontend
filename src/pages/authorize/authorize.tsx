import { useState, useEffect } from 'react';

import Loading from '../../components/loading/loading';

import classes from './authorize.module.css';

export default function Authorize() {
    const [isLoading, updateLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        (async function authorizeLogin() {
            try {

            }
            catch(e) {
                setMessage('Error');
            }

            updateLoading(false);
        })();
    }, []);

    if (isLoading) return <Loading/>;

    return (
        <div className={ classes.authContainer }>
            {
                !message ? (
                    <h1>Success!</h1>
                ) : (
                    <h1>{ message }</h1>
                )
            }
        </div>
    );
}
