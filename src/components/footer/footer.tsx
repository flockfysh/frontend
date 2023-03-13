import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

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
                    <span>261 Market Street</span>
                    <span>Berkeley, CA, United States</span>
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
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Use</a>
            </div>
        </footer>
    );
}
