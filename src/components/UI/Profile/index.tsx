import React from 'react';
import { UserContext } from '@/contexts/userContext';
import { ReactSVG } from 'react-svg';
import classes from './styles.module.css';
import more from '@/icons/main/more-vertical.svg';
import Image from 'next/image';

export default function Profile() {
    const { curUser } = React.useContext(UserContext);
    if (!curUser) {
        return <></>;
    }
    return (
        <div className={ classes.profileContainer }>
            <img className={ classes.profileImage } src={ curUser.profileImage } alt={ curUser.name }/>
            <div className={ classes.profileTextInfo }>
                <span className={ classes.displayName }>{curUser.name}</span>
                <span className={ classes.email }>{curUser.email}</span>
            </div>
            <button className={ classes.button }>
                <ReactSVG className={ classes.icon } src={ more.src }></ReactSVG>
            </button>
        </div>
    );
}
