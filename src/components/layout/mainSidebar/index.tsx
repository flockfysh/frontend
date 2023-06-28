import { ReactSVG } from 'react-svg';

import { StaticImageData } from 'next/image';
import Link from 'next/link';

import Logo from './logo';
import Profile from '@/components/layout/mainSidebar/profile';

import home from '@/icons/main/home.svg';
import document from '@/icons/main/file-text.svg';
import layers from '@/icons/main/3-layers.svg';
import analytics from '@/icons/main/sliders.svg';
import settings from '@/icons/main/settings.svg';
import help from '@/icons/main/help-circle.svg';
import bell from '@/icons/main/bell.svg';

import classes from './styles.module.css';

interface SidebarLinkProps {
    icon: StaticImageData,
    text: string,
    href: string,
}

function SidebarLink(props: SidebarLinkProps) {
    return (
        <Link href={ props.href } className={ classes.sidebarLink }>
            <ReactSVG src={ props.icon.src } className={ classes.sidebarLinkSVG } />
            <span className={ classes.sidebarLinkText }>{ props.text }</span>
        </Link>
    );
}

const SECTION_1_LINKS: SidebarLinkProps[] = [
    {
        href: '/datasets',
        text: 'My Datasets',
        icon: home,
    },
    {
        href: '/recipes',
        text: 'Recipes',
        icon: document,
    },
    {
        href: '/training',
        text: 'Training',
        icon: layers,
    },
    {
        href: '/analytics',
        text: 'Analytics',
        icon: analytics,
    },
];

const SECTION_2_LINKS: SidebarLinkProps[] = [
    {
        href: '/notifications',
        text: 'Notifications',
        icon: bell,
    },
    {
        href: '/changelogs',
        text: 'Release Notes',
        icon: help,
    },
    {
        href: '/documentation',
        text: 'Documentation',
        icon: document,
    },
    {
        href: '/settings',
        text: 'Settings',
        icon: settings,
    },
];


export default function MainSidebar() {
    return (
        <nav className={ classes.sidebar }>
            <div className={ classes.segment }>
                <Logo />

                <div>
                    { SECTION_1_LINKS.map(props => {
                        return <SidebarLink key={ props.href } { ...props } />;
                    }) }
                </div>
            </div>
            <div className={ classes.segment }>
                <div>
                    { SECTION_2_LINKS.map(props => {
                        return <SidebarLink key={ props.href } { ...props } />;
                    }) }
                </div>

                <Profile />
            </div>
        </nav>
    );
}
