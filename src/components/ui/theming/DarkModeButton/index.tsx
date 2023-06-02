import { ReactSVG } from 'react-svg';
import sun from '@/icons/main/sun.svg';
import classes from './styles.module.css';

export default function DarkModeButton() {
    return (
        <button className={ classes.button }>
            <ReactSVG src={ sun.src } className={ classes.buttonIcon }></ReactSVG>
        </button>
    );
}
