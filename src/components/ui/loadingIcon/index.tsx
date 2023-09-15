// // TODO: Fix this component

import loading from '@/icons/branding/loading.svg';
import classes from './loadingIcon.module.css';
import Image from 'next/image';

export default function LoadingIcon(props: React.ComponentPropsWithRef<'img'>) {
    return (
        <Image src={ loading } alt={ 'Loading...' } 
             className={ `${classes.loadingIcon} ${props.className || ''}` }/>
    );
}
