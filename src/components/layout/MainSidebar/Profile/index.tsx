import React from 'react';
import { ReactSVG } from 'react-svg';

import { UserContext } from '@/contexts/userContext';

import more from '@/icons/main/more-vertical.svg';

import classes from './styles.module.css';

export default function Profile() {
    const { user } = React.useContext(UserContext);

    if (!user) return <></>;

    return (
        <div className={ classes.profileContainer }>
            <img className={ classes.profileImage } src={ user.profilePhoto } alt={ user.fullName }/>

            <div className={ classes.profileTextInfo }>
                <span className={ classes.displayName }>{user.fullName}</span>
                <span className={ classes.email }>{user.email}</span>
            </div>

            <button className={ classes.button }>
                <ReactSVG className={ classes.icon } src={ more.src }/>
            </button>
        </div>
    );
}