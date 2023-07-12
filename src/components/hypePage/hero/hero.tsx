import { useState, useCallback, useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

import foundryImage from '../images/citris-foundry.png';

import classes from './hero.module.css';

export default function Hero() {
    const [_accessRequestSuccess, _setAccessRequestSuccess] = useState(false);
    const [errorMessage, updateErrorMessage] = useState('');
    const [successMessage, updateSuccesMessage] = useState('');

    const waitlistFormRef = useRef<HTMLFormElement | null>(null);
    waitlistFormRef;

    const onEmailChange = useCallback(() => {
        if (errorMessage !== '') {
            updateErrorMessage('');
        }
        if (successMessage !== '') {
            updateSuccesMessage('');
        }
    }, [errorMessage, successMessage]);
    onEmailChange;

    return (
        <section className={ classes.heroSectionDiv }>
            <div className={ classes.infoFoundry }>
                <div>flockfysh joins</div>

                <div className={ classes.foundryLogoContainer }>
                    <img
                        src={ foundryImage.src }
                        className={ classes.foundryLogo }
                        alt="foundry"
                    />
                </div>

                <div>|</div>

                <div className={ classes.readMoreFoundry }>
                    <Link href="https://blog.flockfysh.ai/blog/flockfysh-citrus/" target = "_blank"> Read More </Link>

                    <BsArrowRight size={ 15 } />
                </div>
            </div>

            <div className={ classes.contentSection }>
                <span className={ classes.infoBeta }> Currently in beta! </span>

                <h1 className={ classes.heroHeading }>
                    Dataset&nbsp;creation from&nbsp;the&nbsp;future.
                </h1>

                <span>Polished for any use AI case, flockfysh takes the complexity out of acquiring AI.</span>

                <span className={ classes.extraInfo }>
                    Designed for developers, researchers, and those who dare to
                    dream.
                </span>
            </div>
        </section>
    );
}
