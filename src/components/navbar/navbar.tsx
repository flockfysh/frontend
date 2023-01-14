import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {RxHamburgerMenu} from 'react-icons/rx';

import NavItem from '../navItem/navItem';

import {UserContext} from '../../contexts/userContext';

import classes from './navbar.module.css';
import MobileNavItem from "../navItem/mobileNavItem";

export default function Navbar() {
    const {loggedIn} = useContext(UserContext);
    const [navOpen, updateNav] = useState(false);
    const navLinks = [
        {
            to: '/',
            name: 'Home'
        },
        {
            to: '/blog',
            name: 'Blog'
        },
        {
            to: '/docs',
            name: 'Documentation'
        },
        {
            to: '/about',
            name: 'About'
        }
    ];

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    useEffect(() => {
        function resize() {
            if (mediaQuery.matches) {
                updateNav(false);
            }
        }

        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    function changeNavDisplay() {
        updateNav(!navOpen);
    }

    return (
        <nav className={classes.nav}>
            <Link className={classes.logoText} to="/">FlockFysh</Link>
            <button className={classes.navOpenButton}>
                {
                    navOpen ? (
                        <div className={classes.mobileNavLinksContainer}>
                            {
                                navLinks.map(
                                    (link, i) => (
                                        <MobileNavItem to={link.to} name={link.name} key={i}/>
                                    )
                                )
                            }
                        </div>
                    ) : <></>
                }
                <RxHamburgerMenu onClick={changeNavDisplay}/>
            </button>
            <ul className={classes.listContainer}>
                {
                    navLinks.map(
                        (link, i) => (
                            <NavItem to={link.to} name={link.name} key={i}/>
                        )
                    )
                }

                {
                    loggedIn ? <NavItem to="/dashboard" name="Dashboard"/> : <NavItem to="/login" name="Login"/>
                }
            </ul>
        </nav>
    );
}
