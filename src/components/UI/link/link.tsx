import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';
import { isUrlExternal } from 'is-url-external';

export default function NavLink(props: NavLinkProps) {
    let possibleExternalLink: string;
    if (typeof props.to === 'string') {
        possibleExternalLink = props.to;
    }
    else {
        possibleExternalLink = props.to?.pathname || '';
    }
    // if (isUrlExternal(possibleExternalLink, window.location.href)) {
        const className = typeof props.className !== 'string' ? props.className?.({
            isActive: false,
            isPending: false,
        }) : props.className;
        return <a { ...props as React.ComponentPropsWithRef<'a'> } href={ possibleExternalLink } className={ className }></a>;
    // }
    // return (
    //     <RouterNavLink { ...props }></RouterNavLink>
    // );
}
