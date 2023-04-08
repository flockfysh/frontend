import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import foundryImage from '../../../images/citris-foundry.png';
import validateEmail from '../../../helpers/validateEmail';
import classes from './hero.module.css';
import api from '../../../helpers/api';

export default function Hero() {
    const [accessRequestSuccess, setAccessRequestSuccess] = React.useState(false);
    const [errorMessage, updateErrorMessage] = React.useState('');
    const [successMessage, updateSuccesMessage] = React.useState('');
    const waitlistFormRef = React.useRef<HTMLFormElement | null>(null);

    const onEmailChange = React.useCallback(() => {
        if (errorMessage !== '') {
            updateErrorMessage('');
        }
        if (successMessage !== '') {
            updateSuccesMessage('');
        }
    }, [errorMessage]);

    async function addUserToWaitlist(e: React.MouseEvent) {
        e.preventDefault();

        try {
            if (waitlistFormRef.current) {
                const waitlistForm = waitlistFormRef.current;
                const fd = new FormData(waitlistForm);
                const email = fd.get('email') as string;
                if (!email) {
                    updateErrorMessage('Please enter an email.');
                    return;
                }
                else if (!validateEmail(email)) {
                    updateErrorMessage('Please enter a valid email.');
                    return;
                }
                await api.post('/api/auth/waitlist', {
                    email,
                });
                updateSuccesMessage('You are on the waiting list');
                setAccessRequestSuccess(true);
            }
        }
 catch (Error) {
            throw Error;
        }
    }

    return (
        <section className={ classes.heroSectionDiv }>
            <div className={ classes.infoFoundry }>
                <div>
                    flockfysh joins
                </div>

                <div className={ classes.foundryLogoContainer }>
                    <img src={ foundryImage } className={ classes.foundryLogo }/>
                </div>

                <div>|</div>

                <div className={ classes.readMoreFoundry }>
                    <a href="https://blog.flockfysh.tech/blog/flockfysh-citrus/">Read More</a>
                    <BsArrowRight size={ 15 }/>
                </div>
            </div>

            <div className={ classes.contentSection }>
                <span className={ classes.infoBeta }>Currently in private beta</span>

                <h1 className={ classes.heroHeading }>Dataset&nbsp;creation from&nbsp;the&nbsp;future.</h1>

                <span>Polished for any use case, flockfysh takes the complexity out of datasets.</span>
                <span
                    className={ classes.extraInfo }
                >
                    Designed for developers, researchers, and those who dare to dream.
                </span>
            </div>

            <form
                className={ `${classes.inputEmail} ${successMessage !== '' ? classes.inputSuccessEmail : ''}` }
                ref={ waitlistFormRef }
            >
                <div>
                    <input
                        onChange={ onEmailChange }
                        type="email"
                        name="email"
                        placeholder="Your email here"
                    />

                    <label>{errorMessage}</label>
                    <span>{successMessage}</span>
                </div>

                <button
                    type="submit"
                    disabled={ successMessage !== '' }
                    onClick={ addUserToWaitlist }
                    className={ `${classes.submitButton} ${accessRequestSuccess ? classes.submitSuccess : ''}` }
                >
                    {accessRequestSuccess ? 'Request sent!' : 'Request access'}
                </button>
            </form>
        </section>
    );
}
