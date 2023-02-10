import { useContext } from 'react';

import GradientLink from '../../UI/gradientLink/gradientLink';

import { UserContext } from '../../../contexts/userContext';

import classes from './userSignup.module.css';

export default function UserSignup() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <section className={ classes.holder }>
      <h3 className={ classes.heading }>Ready? Set? Create!</h3>

      <p className={ classes.text }>
        What are you waiting for? Show our data-driven world who's king, maybe
        with a couple of stats ;&#41;
      </p>

      <GradientLink
        hasArrow={ true }
        children="Commence FlockFyshing!"
        to={"https://airtable.com/shr6RKoVDCd0MuFGm" }
      />
    </section>
  );
}
