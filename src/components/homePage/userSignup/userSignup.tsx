import { useContext } from 'react';

import GradientLink from '../../UI/gradientLink/gradientLink';

import { UserContext } from '../../../contexts/userContext';

import classes from './userSignup.module.css';

export default function UserSignup() {
  const { curUser } = useContext(UserContext);

  return (
    <section className={ classes.holder }>
      <h3 className={ classes.heading }>Ready? Set? Create!</h3>

      <p className={ classes.text }>
        What are you waiting for? Show our data-driven world who's king!
      </p>

      <GradientLink
        hasArrow={ true }
        children="Commence FlockFyshing!"
        to={ curUser ? 'https://airtable.com/shr6RKoVDCd0MuFGm' : 'https://airtable.com/shr6RKoVDCd0MuFGm' }
      />
    </section>
  );
}
