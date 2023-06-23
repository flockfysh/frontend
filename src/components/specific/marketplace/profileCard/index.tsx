import { useRouter } from 'next/router';

import classes from './styles.module.css';

type ProfileCardProps = {
    profilePicture: string;
    username: string;
}

export default function ProfileCard(props: ProfileCardProps) {
    const { push } = useRouter();

    return (
        <div className={ classes.profileContainer } onClick={ () => push('/profile') }>
            <img src={ props.profilePicture } alt="Profile Picture"/>

            <p>@{ props.username }</p>
        </div>
    );
}
