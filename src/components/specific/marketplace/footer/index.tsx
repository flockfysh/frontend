import { ReactSVG } from 'react-svg';
import Link from 'next/link';

import twitter from '@/icons/base/twitter.svg';
import linkedin from '@/icons/base/linkedin.svg';
import github from '@/icons/providers/github.svg';
import skydeck from '@/icons/skydeck.png';

import classes from './styles.module.css';

export default function Footer() {
    return (
        <div className={ classes.footer }>
            <div className={ classes.socials }>
                <div className={ classes.socialIconContainer }>
                    <Link href="https://github.com/flockfysh" target = "_blank">
                        <ReactSVG className={ classes.github } src={ github.src } />
                    </Link>
                    <Link href="https://twitter.com/flockfysh" target = "_blank">
                        <ReactSVG className={ classes.socialIcon } src={ twitter.src } />
                    </Link>
                    <Link href="https://linkedin.com/company/flockfysh" target = "_blank">
                        <ReactSVG className={ classes.socialIcon } src={ linkedin.src } />
                    </Link>
                </div>

                <div className={ classes.contactInfoContainer }>
                    <p>2594 Hearst Ave</p>
                    <p>Berkeley, CA, United States</p>
                </div>
            </div>

            <div className={ classes.logoContainer }>
                <h1>fl</h1>
                <h1 className={ classes.gradientO }>o</h1>
                <h1>ck</h1>
                <h1 className={ classes.blueFysh }>fysh</h1>
            </div>

            <div className={ classes.tos }>
                <div className={ classes.backed }>
                    <p>Backed by </p>

                    <img src={ skydeck.src } alt="skydeck" />
                </div>

                <div className={ classes.tosContent }>
                    <Link className={ classes.link } href="/terms">Terms of Service</Link>
                    <span className={ classes.circleDivider } />
                    <Link className={ classes.link } href="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}
