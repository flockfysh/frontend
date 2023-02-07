import {Link} from 'react-router-dom';
import React from 'react';
import classes from './miniProfile.module.css';
import {UserContext} from '../../../../contexts/userContext';

export default function MiniProfile() {
    const {curUser} = React.useContext(UserContext);

    if (curUser) {
        return (
            <Link to="/dashboard/profile">
                <div className={classes.mainDiv}>
                    <img className={classes.image} src={curUser.profileImage} alt=""/>

                    <div className={classes.textInfo}>
                        <div className={classes.name}>{curUser.name}</div>
                        <div className={classes.email}>{curUser.email}</div>
                    </div>
                </div>
            </Link>
        );
    }

    return null;
}
