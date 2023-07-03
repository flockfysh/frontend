import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ClassNameProps {
    isActive: boolean
    isPending: boolean
}

interface NavLinkProps extends Omit<LinkProps, 'className' | 'href'>{
    className: string | ((values: ClassNameProps) => string);
    to: string;
    children: React.ReactNode;
}


export default function NavLink(props: NavLinkProps) {
    const route = useRouter();
    const regEx = /^http/;

    

    const className =
        typeof props.className !== 'string'
            ? props.className?.({
                  isActive: route.pathname === props.to,
                  isPending: route.pathname === props.to,
              })
            : props.className;

    return regEx.test(props.to) ? (
      <Link href={ props.to } className={ className }>{ props.children }</Link>
    ) : (
      <a href={ props.to } className={ className }>{ props.children }</a>
    );
}
