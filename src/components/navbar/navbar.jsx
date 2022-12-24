import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { UserContext } from '../../userContext';

import classes from './navbar.module.css';

export default function Navbar() {
   const { loggedIn } = useContext(UserContext);

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

   return (
      <nav className={ classes.nav }>
         <Link className={ classes.logoText } to="/">FlockFysh</Link>

         <ul className={ classes.listContainer }>
            {
               navLinks.map(
                  (link, i) => (
                     <li className={ classes.listItem } key={ i }>
                        <NavLink
                           to={ link.to }
                           className={
                              navData => navData.isActive ? `${ classes.navbarLinkActive } ${ classes.navbarLink }` : classes.navbarLink
                           }
                           end
                        >
                           { link.name }
                        </NavLink>
                     </li>
                  )
               )
            }

            {
               loggedIn ? (
                  <li className={ classes.listItem }>
                     <NavLink
                        to="/dashboard/profile"
                        className={
                           navData => navData.isActive ? `${ classes.navbarLinkActive } ${ classes.navbarLink }` : classes.navbarLink
                        }
                        end
                     >
                        Profile
                     </NavLink>
                  </li>
               ) : (
                  <li className={ classes.listItem }>
                     <NavLink
                        to="/login"
                        className={
                           navData => navData.isActive ? `${ classes.navbarLinkActive } ${ classes.navbarLink }` : classes.navbarLink
                        }
                        end
                     >
                        Login
                     </NavLink>
                  </li>
               )
               
            }
         </ul>
      </nav>
   );
}
