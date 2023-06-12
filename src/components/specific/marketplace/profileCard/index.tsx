import classes from './styles.module.css';

type ProfileCardProps = {
    profilePicture: string;
    username: string;
}

export default function ProfileCard(props: ProfileCardProps) {
    return (
        <div className={ classes.profileContainer }>
            <img src={ props.profilePicture } alt="Profile Picture" />
            
            <p>@{ props.username }</p>
        </div>
    );
}
