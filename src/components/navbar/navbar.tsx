import {useContext, useEffect, useState, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';

import {RxHamburgerMenu} from 'react-icons/rx';

import NavItem from '../navItem/navItem';

import {UserContext} from '../../contexts/userContext';

import classes from './navbar.module.css';
import MobileNavItem from "../navItem/mobileNavItem";
import {ScreenContext} from "../../contexts/screenContext";

export default function Navbar() {
    const {loggedIn} = useContext(UserContext);
    const {windowTooSmall} = useContext(ScreenContext);
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

    if (!windowTooSmall && navOpen) {
        updateNav(false);
    }

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
