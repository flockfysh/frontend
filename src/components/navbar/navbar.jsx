import classes from "./navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
   return (
      <nav className={classes.nav}>
         <h1 className={classes.logoText}>FlockFysh</h1>

         <ul className={classes.listContainer}>
            <li className={classes.listItem}>
               <NavLink
                  to="/"
                  end
                  className={navData =>
                     navData.isActive ? classes.navbarLinkActive : classes.navbarLink
                  }>
                  Home
               </NavLink>
            </li>
            <li className={classes.listItem}>
               <NavLink
                  to="/blog"
                  className={navData =>
                     navData.isActive ? classes.navbarLinkActive : classes.navbarLink
                  }>
                  Blog
               </NavLink>
            </li>
            <li className={classes.listItem}>
               <NavLink
                  to="/docs"
                  className={navData =>
                     navData.isActive ? classes.navbarLinkActive : classes.navbarLink
                  }>
                  Documentation
               </NavLink>
            </li>
            <li className={classes.listItem}>
               <NavLink
                  to="/about"
                  className={navData =>
                     navData.isActive ? classes.navbarLinkActive : classes.navbarLink
                  }>
                  About
               </NavLink>
            </li>
            <li className={classes.listItem}>
               <NavLink
                  to="/login"
                  className={navData =>
                     navData.isActive ? classes.navbarLinkActive : classes.navbarLink
                  }>
                  Login
               </NavLink>
            </li>
         </ul>
      </nav>
   );
}
