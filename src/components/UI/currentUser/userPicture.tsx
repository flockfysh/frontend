import React from 'react';
import { UserContext } from '../../../contexts/userContext';

export default function UserPicture(props: React.ComponentPropsWithRef<'img'>) {
    const { curUser } = React.useContext(UserContext);
    
    if (curUser) return <img className={ `${props.className || ''}` } src={ curUser.profileImage } alt={ curUser.name }></img>;
    
    return <></>;
}
