import { NavLink } from 'react-router-dom';

import classes from './navItem.module.css';

export default function NavItem(props) {
    return (
        <li className={ classes.listItem }>
            <NavLink
               to={ props.to }
               className={
                  navData => navData.isActive ? `${ classes.navbarLinkActive } ${ classes.navbarLink }` : classes.navbarLink
               }
               end
            >
               { props.name }
            </NavLink>
        </li>
    );
}
