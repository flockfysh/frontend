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
    const [value, setValue] = useState('')
    return (
        <div className={ classes.eachLinkDiv }>
            <ReactSVG
                src={ icon.src }
                className={ classes.icons + ' ' + classes.inputIcons }
            />

            <input
                className={ classes.linkInput }
                value={ value }
                placeholder={placeholder}
                {...register(name)}
                onChange={ (event) => setValue(event.target.value) }
            />
        </div>

    )
}

export default IconInput;
