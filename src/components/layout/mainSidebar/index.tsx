import { ReactSVG } from 'react-svg';

import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import _default from 'chart.js/dist/core/core.interaction';

import Logo from './logo';
import Profile from '@/components/layout/mainSidebar/profile';

import api from '@/helpers/api';

import home from '@/icons/main/home.svg';
import document from '@/icons/main/file-text.svg';
import settings from '@/icons/main/settings.svg';
import money from '@/icons/main/dollar-sign.svg';
import marketplace from '@/icons/main/shopping-cart.svg';
import help from '@/icons/main/help-circle.svg';
import bell from '@/icons/main/bell.svg';

import classes from './styles.module.css';

interface SidebarLinkProps {
    icon: StaticImageData;
    text: string;
    href: string;
    onClick?: () => Promise<string>;
}

function SidebarLink(props: SidebarLinkProps) {
    const router = useRouter();

    return (
        <Link
            href={ props.href }
            className={ classes.sidebarLink }
            onClick={ async () => {
                const link = await props.onClick?.();
                if (link) {
                    await router.push(link);
                }
            } }
        >
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
        href: '/marketplace',
        text: 'Marketplace',
        icon: marketplace,
    },
    {
        href: '#',
        text: 'Manage Payout',
        icon: money,
        onClick: async () => {
            try {
                return await api
                    .post<Api.Response<string>>('/api/users/payout/dashboard', {
                        returnUrl: window.location.href,
                    })
                    .then((res) => res.data.data);
            }
 catch (e) {
                return await api
                    .post<Api.Response<string>>(
                        '/api/users/payout/onboarding',
                        {
                            returnUrl: window.location.href,
                        }
                    )
                    .then((res) => res.data.data);
            }
        },
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
                    { SECTION_1_LINKS.map((props) => {
                        return <SidebarLink key={ props.href } { ...props } />;
                    }) }
                </div>
            </div>

            <div className={ classes.segment }>
                <div>
                    { SECTION_2_LINKS.map((props) => {
                        return <SidebarLink key={ props.href } { ...props } />;
                    }) }
                </div>

                <Profile />
            </div>
        </nav>
    );
}
