import { useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

import foundryImage from '../../../images/citris-foundry.png';

import validateEmail from '../../../helpers/validateEmail';

import classes from './hero.module.css';

export default function Hero() {
    const email = useRef({} as HTMLInputElement);
    const [errorMessage, updateErrorMessage] = useState('');

    async function requestAccess() {
        if(!email.current!.value) {
            updateErrorMessage('Please enter an email.');
            
            return;
        }
        else if(!validateEmail(email.current!.value)) {
            updateErrorMessage('Please enter a valid email.');
            
            return;
        }
    }

    return (
        <section className={ classes.heroSectionDiv }>
            <div className={ classes.infoFoundry }>
                <div>
                    flockfysh join
                </div>
                
                <div>
                    <img src={ foundryImage } className={ classes.foundryLogo } />
                </div>

                <div>|</div>

                <div className={ classes.readMoreFoundry }>
                    <a href="#">Read More</a>
                    <BsArrowRight size={ 15 } />
                </div>
            </div>

            <div className={ classes.contentSection }>
                <span className={ classes.infoBeta }>Currently in private beta</span>
                <h1>Dataset Creation from the future.</h1>
                <span>Made for any use cases, flockfysh is the AI that takes the complexity out of getting datasets.</span>
                <span className={ classes.extraInfo }>Designed for Developers, Researchers, and Enthusiasts </span>
            </div>
            
            <div className={ classes.inputEmail }>
                <div>
                    <input type="email" placeholder="Your Email Here" ref={ email } onChange={ () => updateErrorMessage('') } />
                    <label>{ errorMessage }</label>
                </div>

                <button type="submit" onClick={ requestAccess }>Request Access</button>
            </div>
            
            <div className={ classes.otherContent }>
                <span>Designed for Developers, Researchers, and Enthusiasts.</span>
            </div>
        </section>
    );
}
