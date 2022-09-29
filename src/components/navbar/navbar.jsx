import classes from "./navbar.module.css";

export default function Navbar() {
   return (
      <nav className={classes.nav}>
         <h1 className={classes.logoText}>FlockFysh</h1>
         <div className={classes.linksContainer}>
            <ul>
               <li>
                  <a className={classes.navbarLink} href="/">
                     About Us
                  </a>
               </li>
               <li>
                  <a className={classes.navbarLink} href="/">
                     Contact
                  </a>
               </li>
            </ul>
            <div className={classes.getStartedBtn}>Get Started</div>
         </div>
      </nav>
   );
}
