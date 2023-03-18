import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import foundryImage from '../../../images/citris-foundry.png';
import validateEmail from '../../../helpers/validateEmail';
import classes from './hero.module.css';
import api from '../../../helpers/api';

export default function Hero() {
    const [accessRequestSuccess, setAccessRequestSuccess] = React.useState(false);
    const [errorMessage, updateErrorMessage] = React.useState('');
    const waitlistFormRef = React.useRef<HTMLFormElement | null>(null);

    async function addUserToWaitlist(e: React.MouseEvent) {
        e.preventDefault();
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
            setAccessRequestSuccess(true);
        }
    }

    return (
        <section className={ classes.heroSectionDiv }>
            <div className={ classes.infoFoundry }>
                <div>
                    flockfysh join
                </div>

                <div>
                    <img src={ foundryImage } className={ classes.foundryLogo }/>
                </div>

                <div>|</div>

                <div className={ classes.readMoreFoundry }>
                    <a href="#">Read More</a>
                    <BsArrowRight size={ 15 }/>
                </div>
            </div>

            <div className={ classes.contentSection }>
                <span className={ classes.infoBeta }>Currently in private beta</span>
                <h1 className={ classes.heroHeading }>Dataset&nbsp;creation from&nbsp;the&nbsp;future.</h1>
                <span>Made for any use cases, flockfysh is the AI that takes the complexity out of getting datasets.</span>
                <span className={ classes.extraInfo }>Designed for Developers, Researchers and Enthusiasts.</span>
            </div>

            <form className={ classes.inputEmail } ref={ waitlistFormRef }>
                <div>
                    <input type="email" name="email" placeholder="Your email here"/>
                    <label>{errorMessage}</label>
                </div>
                <button type="submit"
                        onClick={ addUserToWaitlist }
                        className={ `${classes.submitButton} ${accessRequestSuccess ? classes.submitSuccess : ''}` }>{accessRequestSuccess ? 'Access request sent!' : 'Request access'}
                </button>
            </form>

            <div className={ classes.otherContent }>
                <span>Designed for Developers, Researchers and enthusiasts.</span>
            </div>
        </section>
    );
}
