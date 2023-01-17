import GradientLink from '../../components/UI/gradientLink/gradientLink';

import classes from './pageNotFound.module.css';

export default function PageNotFound() {
  return (
    <div className={ classes.pnfContainer }>
      <div className={ classes.pnfNumbersContainer }>
        <span>4</span>
        <span className={ classes.pnfColoredLetter }>0</span>
        <span>4</span>
      </div>

      <p>
        We fyshed long and hard but couldn't find the page you were looking for
      </p>

      <div className={ classes.pnfButtonContainer }>
        <GradientLink to="/" text="Home" />
      </div>
    </div>
  );
}
