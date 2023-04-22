import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import foundryImage from '../../images/citris-foundry.png';

import classes from './footer.module.css';

export default function Footer() {
    return (
        <footer className={ classes.footer }>
            <div className={ classes.footerOtherContent }>
                <div className={ classes.footerOtherContentLinks }>
                    <a href="https://github.com/flockfysh" target="_blank">
                        <FaGithub />
                    </a>
                    <a href="https://twitter.com/flockfysh" target="_blank">
                        <FaTwitter />
                    </a>
                    <a href="https://www.linkedin.com/company/flockfysh/" target="_blank">
                        <FaLinkedinIn />
                    </a>
                </div>

                <div className={ classes.footerOtherAddressLinks }>
                    <span>2594 Hearst Ave</span>
                    <span>Berkeley, CA 94720, US</span>
                    <a href="mailto:hey@flockfysh.tech" target="_blank">
                        hey@flockfysh.tech
                    </a>
                </div>
            </div>

            <div className={ classes.footerFoundry }>
                <div className={ classes.footerFoundryBackedByContainer }>
                    <b>Backed by</b>
                </div>
                <div className={ classes.footerFoundryLogoContainer }>
                    <img src={ foundryImage } alt="Foundry logo" />
                </div>
            </div>

            <div className={ classes.footerPrivacy }>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Use</Link>
            </div>
        </footer>
    );
}
