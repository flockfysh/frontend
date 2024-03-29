import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { RxHamburgerMenu } from 'react-icons/rx';
import { BsArrowRight } from 'react-icons/bs';

import NavItem from './navItem';
import MobileNavItem from './mobileNavItem';

import logoIcon from '@/icons/branding/fish.svg';

import classes from './navbar.module.css';
import { UserContext } from '@/contexts/userContext';

export default function HomeNavbar() {
    const [navOpen, updateNav] = useState(false);
    const { user, refreshUser } = useContext(UserContext);

    console.log(user);

    const navLinks = [
        {
            to: '/#roadmap',
            name: 'Roadmap',
        },
        {
            to: 'https://docs.flockfysh.ai',
            name: 'Docs',
        },
        {
            to: 'https://blog.flockfysh.ai',
            name: 'Blog',
        },
    ];

    return (
        <nav className={ classes.nav }>
            <Link className={ classes.logo } href="/">
                <Image
                    src={ logoIcon }
                    className={ classes.logoImg }
                    width={ 40 }
                    height={ 40 }
                    alt="logo"
                />
                
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

                        {
                            user ? 
                            (
                                <MobileNavItem to="/marketplace" name="Marketplace" />
                            ) : 
                            (
                                <MobileNavItem to="/login" name="Log in" />
                            ) 
                        }
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
                {
                    user ? 
                    ( 
<Link href="/marketplace" className={ classes.signinButton }>
                        Marketplace{ ' ' }
                        <BsArrowRight size={ 15 } className={ classes.siginArrow } />
                     </Link>
                    ) : (
                        <Link href="/login" className={ classes.signinButton }>
                            Log in{ ' ' }
                            <BsArrowRight size={ 15 } className={ classes.siginArrow } />
                         </Link>
                    )
                }
            </div>
        </nav>
    );
}
