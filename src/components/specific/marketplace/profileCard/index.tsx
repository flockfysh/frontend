import Link from 'next/link';
import classes from './styles.module.css';

type ProfileCardProps = {
    profilePicture: string;
    username: string;
    className?: string;
};

export default function ProfileCard(props: ProfileCardProps) {
    return (
        <Link
            href={`/profile/${props.username}`}
            className={`${classes.profileContainer} ${props.className || ''}`}
        >
            <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29uJTIwcG9ydHJhaXQlMjBwaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="Profile Picture"
            />

            <p>@{props.username}</p>
        </Link>
    );
}
