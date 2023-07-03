import Link from 'next/link';
import Avatar from 'boring-avatars';

import classes from './styles.module.css';

type ProfileCardProps = {
    profilePicture: string;
    username: string;
    className?: string;
};

export default function ProfileCard(props: ProfileCardProps) {
    return (
        <Link
            href={ `/profile/${props.username}` }
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
        </Link>
    );
}
