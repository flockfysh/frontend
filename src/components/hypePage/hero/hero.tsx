import { BsArrowRight } from 'react-icons/bs';
import foundryImage from '../../../images/citris-foundry.png';

import classes from './hero.module.css';

export default function Hero() {
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
                <span className={ classes.extraInfo }>Designed for Developers, Researchers and Enthusiasts </span>
            </div>
            
            <div className={ classes.inputEmail }>
                <input type="email" name="" id="" placeholder="Your Email Here" />
                <button type="submit">Request Access</button>
            </div>
            
            <div className={ classes.otherContent }>
                <span>Designed for Developers, Researchers and enthusiasts.</span>
            </div>
        </section>
    );
}
