// // TODO: Fix this component

import loadingIcon from '@/icons/loading.svg';
import classes from './loadingIcon.module.css';

//React.ComponentPropsWithRef<'img'>
export default function LoadingIcon() {
    return (
        <img src={ loadingIcon } alt={ 'Loading...' } 
             className={ `${classes.loadingIcon}` }/>
    );
}
