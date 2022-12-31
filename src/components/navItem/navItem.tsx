import { NavLink } from 'react-router-dom';

import classes from './navItem.module.css';

type NavItemProps = {
  to: string;
  name: string;
};

export default function NavItem(props: NavItemProps) {
  return (
    <li className={ classes.listItem }>
      <NavLink
        to={ props.to }
        className={
          navData => navData.isActive
            ? `${classes.navbarLinkActive} ${classes.navbarLink}`
            : classes.navbarLink
        }
        end
      >
        { props.name }
      </NavLink>
    </li>
  );
}
