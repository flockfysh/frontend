import Link from 'next/link';
import Avatar from 'boring-avatars';

import classes from './styles.module.css';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import user from '@/icons/main/user.svg';
import settings from '@/icons/main/settings.svg';
import zap from '@/icons/main/zap.svg';
import layers from '@/icons/main/2-layers.svg';
import discord from '@/icons/main/Discord.svg';
import help from '@/icons/main/help-circle.svg';
import code from '@/icons/main/code.svg';
import logOut from '@/icons/main/log-out.svg';
import api from '@/helpers/api';
import { useRouter } from 'next/router';

type ProfileCardProps = {
    profilePicture?: string;
    username: string;
    className?: string;
};

export default function ProfileCard(props: ProfileCardProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();


    const logout = async () => {
        await api.get('/api/auth/logout');
        router.replace('/login').then();
    };

    const handleOnCloseMenu = (e: any) => {
        if (!open) return;
        if (e.relatedTarget && e.relatedTarget.id === 'item-div') {
          return;
        }
        setOpen(false);
    };

    return (
        <div className={ classes.buttonWrapper } onBlur={ handleOnCloseMenu }>
            <button
                onClick={ () => setOpen(!open) }
                className={ `${classes.profileContainer} ${props.className || ''}` }
            >
                { props.profilePicture ? (
                    <img
                        src={ props.profilePicture ? props.profilePicture : 'd' }
                        alt="Profile Picture"
                    />
                ) : (
                    <Avatar
                        size={ 32 }
                        name={ Math.random().toString() }
                        variant="marble"
                        colors={ [
                            '#92A1C6',
                            '#146A7C',
                            '#F0AB3D',
                            '#C271B4',
                            '#C20D90',
                        ] }
                    />
                ) }
                <p>@{ props.username }</p>
            </button>
            <div id="menu-div" className={ `${classes.dropdown} ${open ? classes.dropdownActive : ''}` } onClick={ (e) => e.stopPropagation() }>
                <Link id="item-div" href={ `/profile/${props.username}` } className={ classes.dropdownItem }>
                    <ReactSVG src={ user.src } className={ classes.icon } />
                    <span>View Profile</span>
                </Link>
                <Link id="item-div" href="/datasets" className={ classes.dropdownItem }>
                    <ReactSVG src={ zap.src } className={ classes.icon } />
                    <span>My Datasets</span>
                </Link>
                <Link id="item-div" href="/settings" className={ classes.dropdownItem }>
                    <ReactSVG src={ settings.src } className={ classes.icon } />
                    <span>Settings</span>
                </Link>

                <div className={ classes.separator } />
                
                <Link id="item-div" href="/changelog" className={ classes.dropdownItem }>
                    <ReactSVG src={ layers.src } className={ classes.icon } />
                    <span>Changelog</span>
                </Link>
                <a id="item-div" href="https://discord.gg/Ss8vcfQWPM" target="_blank" className={ classes.dropdownItem }>
                    <ReactSVG src={ discord.src } className={ classes.icon } />
                    <span>Join Discord</span>
                </a>
                <Link id="item-div" href="/support" className={ classes.dropdownItem }>
                    <ReactSVG src={ help.src } className={ classes.icon } />
                    <span>Support</span>
                </Link>
                <a id="item-div" href="https://docs.flockfysh.ai/" target="_blank" className={ classes.dropdownItem }>
                    <ReactSVG src={ code.src } className={ classes.icon } />
                    <span>Documentation</span>
                </a>

                <div className={ classes.separator } />

                
                <button id="item-div" onClick={ () => logout() } className={ classes.dropdownItem }>
                    <ReactSVG src={ logOut.src } className={ classes.icon } />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
}
