import { ReactSVG } from 'react-svg';

import user from '@/icons/base/user.svg';
import users from '@/icons/base/users.svg';
import upload from '@/icons/base/upload.svg';

import classes from './styles.module.css';

export default function HowToCards() {
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <ReactSVG className={classes.headerIcon} src={user.src} />

                <div className={classes.cardBase}>
                    <h1>Create an account</h1>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia,molestiae quas vel sint commodi
                        repudiandae consequuntur .
                    </p>
                </div>
            </div>

            <div className={classes.card}>
                <ReactSVG
                    className={classes.headerIcon + ' ' + classes.noBorder}
                    src={upload.src}
                />

                <div className={classes.cardBase}>
                    <h1>Upload & Request Datasets</h1>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia,molestiae quas vel sint commodi
                        repudiandae consequuntur .
                    </p>
                </div>
            </div>

            <div className={classes.card}>
                <ReactSVG
                    className={classes.headerIcon + ' ' + classes.noBorder}
                    src={users.src}
                />

                <div className={classes.cardBase}>
                    <h1>Collaborate</h1>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia,molestiae quas vel sint commodi
                        repudiandae consequuntur .
                    </p>
                </div>
            </div>
        </div>
    );
}
