import { ReactSVG } from 'react-svg';
import classes from './styles.module.css';
import { useState } from 'react';

type IconInputTypes = {
    name: string;
    placeholder: string;
    icon: any;
    register: Function;
};

const IconInput = ({name, placeholder, icon, register}: IconInputTypes) => {
    return (
        <div className={ classes.eachLinkDiv }>
            <ReactSVG
                src={ icon.src }
                className={ classes.icons + ' ' + classes.inputIcons }
            />

            <input
                className={ classes.linkInput }
                placeholder={placeholder}
                {...register(name)}
            />
        </div>

    )
}

export default IconInput;
