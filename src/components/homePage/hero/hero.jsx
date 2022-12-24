import Button from '../../UI/button/button';
import LinkUnderline from '../../UI/linkUnderline/linkUnderline';
import Heading from '../../UI/heading/heading';
import heroImage from '../../../images/heroImage.jpg';

import classes from './hero.module.css';

export default function Hero() {
   return (
      <section className={ classes.heroSectionDiv }>
         <div className={ classes.contentSection }>
            <Heading
               beforeSpan=""
               span="Automatic "
               afterSpan="dataset generation, minus the hassle."
            />

            <div className={ classes.buttonsHolder }>
               <Button hasArrow={ true } text="Start Flockfyshing" link="/signup" />

               <LinkUnderline to="/docs" text="Read the docs" />
            </div>
         </div>
         
         <img src={ heroImage } alt="Hero" className={ classes.image } />
      </section>
   );
}
