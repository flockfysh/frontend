import Button from '../../components/UI/button/button';

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
        <Button to="/" text="Home" />
      </div>
    </div>
  );
}
