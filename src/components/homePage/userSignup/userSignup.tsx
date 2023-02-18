import GradientLink from '../../UI/gradientLink/gradientLink';

import classes from './userSignup.module.css';

export default function UserSignup() {
  return (
    <section className={ classes.holder }>
      <h3 className={ classes.heading }>Ready? Set? Create!</h3>

      <p className={ classes.text }>
        What are you waiting for? Show our data-driven world who's king!
      </p>

      <GradientLink
        hasArrow={ true }
        children="Commence FlockFyshing!"
        to={ 'https://airtable.com/shr6RKoVDCd0MuFGm' }
      />
    </section>
  );
}
