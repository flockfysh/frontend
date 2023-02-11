import React from 'react';
import { UserContext } from '../../../contexts/userContext';

export default function UserName(props: React.ComponentPropsWithRef<'span'>) {
    const { curUser } = React.useContext(UserContext);
    
    if (curUser) return <span className={ `${props.className || ''}` }>{ curUser.name }</span>;
    
    return <></>;
}
