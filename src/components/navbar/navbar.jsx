import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { RxHamburgerMenu } from 'react-icons/rx';

import NavItem from '../navItem/navItem';

import { UserContext } from '../../contexts/userContext';
import { ScreenContext } from '../../contexts/useScreen';

import classes from './navbar.module.css';

export default function Navbar() {
   const { loggedIn } = useContext(UserContext);
   const { windowTooSmall } = useContext(ScreenContext);

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

   function changeNavDisplay() {
      updateNav(!navOpen);
   }

   return (
      <nav className={ classes.nav }>
         <Link className={ classes.logoText } to="/">FlockFysh</Link>

         {
            windowTooSmall ? (
               <div>
                  {
                     windowTooSmall && navOpen ? (
                        <div className={ classes.mobileNavLinksContainer }>
                        
                        </div>
                     ) : <></>
                  }

                  <RxHamburgerMenu onClick={ changeNavDisplay } className={ classes.navOpenButton } />
               </div>
            ) : (
               <ul className={ classes.listContainer }>
                  {
                     navLinks.map(
                        (link, i) => (
                           <NavItem to={ link.to } name={ link.name } key={ i } />
                        )
                     )
                  }

                  {
                     loggedIn ? <NavItem to="/dashboard" name="Dashboard" /> : <NavItem to="/login" name="Login" />
                  }
               </ul>
            )
         }
      </nav>
   );
}
