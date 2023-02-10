import GradientLink from '../../UI/gradientLink/gradientLink';
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
          afterSpan="dataset&nbsp;generation, minus&nbsp;the&nbsp;hassle."
        />
        <div className={ classes.buttonsHolder }>
          <GradientLink hasArrow={ true } children="Start Flockfyshing" to="/signup" />
          <LinkUnderline to="https://airtable.com/shr6RKoVDCd0MuFGm" text="Read the docs" />
        </div>
      </div>

      <div className={classes.imageContainer}>
          <img src={ heroImage } alt="Hero" className={ classes.image } />
      </div>
    </section>
  );
}
