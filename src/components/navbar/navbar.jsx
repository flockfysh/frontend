import { NavLink } from "react-router-dom";

import classes from "./navbar.module.css";

export default function Navbar() {
   const navLinks = [
      {
         to: "/",
         name: "Home"
      },
      {
         to: "/blog",
         name: "Blog"
      },
      {
         to: "/docs",
         name: "Documentation"
      },
      {
         to: "/about",
         name: "About"
      },
      {
         to: "/login",
         name: "Login"
      },
   ];

   return (
      <nav className={ classes.nav }>
         <h1 className={ classes.logoText }>FlockFysh</h1>

         <ul className={ classes.listContainer }>
            {
               navLinks.map(
                  (link, i) => (
                     <li className={ classes.listItem } key={ i }>
                        <NavLink
                           to={ link.to }
                           className={
                              navData => navData.isActive ? classes.navbarLinkActive : classes.navbarLink
                           }
                           end
                        >
                           { link.name }
                        </NavLink>
                     </li>
                  )
               )
            }
         </ul>
      </nav>
   );
}
