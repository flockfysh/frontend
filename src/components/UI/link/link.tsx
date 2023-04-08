import { NavLinkProps } from 'react-router-dom';

export default function NavLink(props: NavLinkProps) {
    let possibleExternalLink: string;

    if (typeof props.to === 'string') possibleExternalLink = props.to;
    else possibleExternalLink = props.to?.pathname || '';

    const className = typeof props.className !== 'string' ? props.className?.({
        isActive: false,
        isPending: false,
    }) : props.className;

    return <a { ...props as React.ComponentPropsWithRef<'a'> } href={ possibleExternalLink } className={ className }></a>;
}
