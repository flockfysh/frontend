import Image from 'next/image';

import fish from '@/icons/branding/fish.svg';

import classes from './styles.module.css';

export default function Logo() {
    return (
        <div className={classes.logoContainer}>
            <Image className={classes.logo} src={fish} alt="Flockfysh" />
            <span className={classes.name}>flockfysh</span>
        </div>
    );
}
