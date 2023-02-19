import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { RxHamburgerMenu } from 'react-icons/rx';

import NavItem from '../navItem/navItem';
import MobileNavItem from '../navItem/mobileNavItem';

import { UserContext } from '../../contexts/userContext';

import classes from './navbar.module.css';

export default function Navbar() {
    const { isLoggedIn } = useContext(UserContext);

    const [navOpen, updateNav] = useState(false);
    
    const navLinks = [
        {
            to: '/',
            name: 'Home'
        },
        {
            to: 'https://blog.flockfysh.tech',
            name: 'Blog'
        },
        {
            to: 'https://docs.flockfysh.tech',
            name: 'Documentation'
        },
        {
            to: '/about',
            name: 'About'
        }
    ];

    return (
        <nav className={ classes.nav }>
            <Link className={ classes.logoText } to="/">flockfysh</Link>

            <button className={ classes.navOpenButton }>
                {
                    navOpen ? (
                        <div className={ classes.mobileNavLinksContainer }>
                            {
                                navLinks.map(
                                    (link, i) => <MobileNavItem to={ link.to } name={ link.name } key={ i }/>
                                )
                            }
                        </div>
                    ) : <></>
                }

                <RxHamburgerMenu onClick={ () => updateNav(!navOpen) }/>
            </button>

            <ul className={ classes.listContainer }>
                {
                    navLinks.map(
                        (link, i) => <NavItem to={ link.to } name={ link.name } key={ i }/>
                    )
                }

                {
                    isLoggedIn ? <NavItem to="/dashboard" name="Dashboard"/> : <NavItem to="/login" name="Login"/>
                }
            </ul>
        </nav>
    );
}
