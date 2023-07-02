import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { RxHamburgerMenu } from 'react-icons/rx';
import { BsArrowRight } from 'react-icons/bs';

import NavItem from './navItem';
import MobileNavItem from './mobileNavItem';

import { UserContext } from '@/contexts/userContext';

import logoIcon from '@/icons/branding/fish.svg';

import classes from './navbar.module.css';

export default function HomeNavbar() {
    const { user } = useContext(UserContext);

    const [navOpen, updateNav] = useState(false);

    const navLinks = [
        {
            to: '/home',
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
            <Link className={ classes.logo } href="/">
                <Image src= { logoIcon } className={ classes.logoImg } width = { 40 } height = { 40 } alt="logo" />
                <span className={ classes.logoText }>flockfysh</span>
            </Link>

            <button className={ classes.navOpenButton }>
                { navOpen ? (
                    <div className={ classes.mobileNavLinksContainer }>
                        { navLinks.map((link, i) => (
                            <MobileNavItem
                                to={ link.to }
                                name={ link.name }
                                key={ i }
                            />
                        )) }
                        { user ? (
                            <MobileNavItem to="/dashboard" name="Dashboard" />
                        ) : (
                            <MobileNavItem to="/login" name="Sign In" />
                        ) }
                    </div>
                ) : (
                    <></>
                ) }

                <RxHamburgerMenu onClick={ () => updateNav(!navOpen) } />
            </button>

            <ul className={ classes.listContainer }>
                { navLinks.map((link, i) => (
                    <NavItem to={ link.to } name={ link.name } key={ i } />
                )) }
            </ul>

            <div className={ classes.signinWrapper }>
                { user ? (
                    <Link href="/dashboard" className={ classes.signinButton }>
                        Marketplace{ ' ' }
                        <BsArrowRight
                            size={ 15 }
                            className={ classes.siginArrow }
                        />
                    </Link>
                ) : (
                    <Link href="/login" className={ classes.signinButton }>
                        Login{ ' ' }
                        <BsArrowRight
                            size={ 15 }
                            className={ classes.siginArrow }
                        />
                    </Link>
                ) }
            </div>
        </nav>
    );
}
