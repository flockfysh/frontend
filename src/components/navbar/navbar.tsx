import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { RxHamburgerMenu } from 'react-icons/rx';
import { BsArrowRight } from 'react-icons/bs';

import NavItem from '../navItem/navItem';
import MobileNavItem from '../navItem/mobileNavItem';

import { UserContext } from '../../contexts/userContext';

import logoIcon from '../../images/icons/logo.svg';

import classes from './navbar.module.css';

export default function Navbar() {
  const { curUser } = useContext(UserContext);

  const [navOpen, updateNav] = useState(false);

  const navLinks = [
    {
      to: '/#roadmap',
      name: 'Roadmap',
    },
    {
      to: 'https://docs.flockfysh.tech',
      name: 'Docs',
    },
    {
      to: 'https://blog.flockfysh.tech',
      name: 'Blog',
    },
  ];

  return (
    <nav className={ classes.nav }>
      <Link className={ classes.logo } to="/">
        <img src={ logoIcon } className={ classes.logoImg } />
        <span className={ classes.logoText }>flockfysh</span>
      </Link>

      <button className={ classes.navOpenButton }>
        {navOpen ? (
          <div className={ classes.mobileNavLinksContainer }>
            {navLinks.map((link, i) => (
              <MobileNavItem to={ link.to } name={ link.name } key={ i } />
            ))}
            {curUser ? (
              <MobileNavItem to="/dashboard" name="Dashboard" />
            ) : (
              <MobileNavItem to="/login" name="Sign In" />
            )}
          </div>
        ) : (
          <></>
        )}

        <RxHamburgerMenu onClick={ () => updateNav(!navOpen) } />
      </button>

      <ul className={ classes.listContainer }>
        {navLinks.map((link, i) => (
          <NavItem to={ link.to } name={ link.name } key={ i } />
        ))}
      </ul>

      <div className={ classes.signinWrapper }>
        {curUser ? (
          <Link to="/dashboard" className={ classes.signinButton }>
            Dashboard <BsArrowRight size={ 15 } className={ classes.siginArrow } />
          </Link>
        ) : (
          <Link to="/login" className={ classes.signinButton }>
            Sign In <BsArrowRight size={ 15 } className={ classes.siginArrow } />
          </Link>
        )}
      </div>
    </nav>
  );
}
