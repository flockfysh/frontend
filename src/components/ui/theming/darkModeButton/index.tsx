import { ReactSVG } from 'react-svg';

import sun from '@/icons/main/sun.svg';

import classes from './styles.module.css';

// TODO: add functionality to darkmode button
export default function DarkModeButton() {
    return (
        <button className={ classes.button }>
            <ReactSVG src={ sun.src } className={ classes.buttonIcon } />
        </button>
    );
}
