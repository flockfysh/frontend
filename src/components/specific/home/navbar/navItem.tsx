import NavLink from './navLink';
import classes from './navItem.module.css';

type NavItemProps = {
    to: string;
    name: string;
};

export default function NavItem(props: NavItemProps) {
    return (
        <li className={ classes.listItem }>
            <NavLink
                to={
                    props.to.split('')[0] === '#' ? { hash: props.to } : { pathname: props.to }
                }
                className={
                    navData => navData.isActive
                        ? `${classes.navbarLinkActive} ${classes.navbarLink}`
                        : classes.navbarLink
                }
                relative={ 'path' }

            >
                { props.name }
            </NavLink>
        </li>
    );
}