import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../../../contexts/userContext';

import classes from './miniProfile.module.css';
import profilePicture from '../../../../images/defaults/profilePicture.svg';

export default function MiniProfile() {
    const { curUser } = useContext(UserContext);

    if (curUser) {
        return (
            <Link to="/dashboard/profile">
                <div className={ classes.mainDiv }>
                    <img className={ classes.image } src={ curUser.profileImage ?? profilePicture } alt=""/>

                    <div className={ classes.textInfo }>
                        <div className={ classes.name }>{curUser.name}</div>
                        <div className={ classes.email }>{curUser.email}</div>
                    </div>
                </div>
            </Link>
        );
    }

    return null;
}
