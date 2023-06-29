import Link from 'next/link';
import classes from './styles.module.css';

type ProfileCardProps = {
    profilePicture: string;
    username: string;
    className?: string;
}

export default function ProfileCard(props: ProfileCardProps) {
    // TODO: fix link
    return (
        <Link
            href={ `/profile/${ props.username }` }
            className={ `${ classes.profileContainer } ${ props.className || '' }` }
        >
            <img src={ props.profilePicture } alt="Profile Picture" />

            <p>@{ props.username }</p>
        </Link>
    );
}
