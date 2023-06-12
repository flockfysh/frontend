import React from 'react';
import classes from './styles.module.css';
import { ReactSVG } from 'react-svg';

interface TextInputProps extends React.ComponentPropsWithoutRef<'input'> {
    icon?: string;
    label?: string;
    classNames?: {
        container?: string;
        input?: string;
        label?: string;
    }

}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props, ref) {
    return (
        <label className={ `${props.classNames?.container || ''} ${classes.labelContainer}` }>
            {props.label ? <span className={ `${props.classNames?.label} ${classes.label}` }>{props.label}</span> : <></>}
            <div className={ classes.inputContainer }>
                <input { ...props }
                       className={ `${props.classNames?.input || ''} ${classes.input} ${props.icon ? classes.inputWithIcon : ''}` }/>
                {props.icon ? <ReactSVG src={ props.icon } className={ classes.icon }></ReactSVG> : ''}
            </div>

        </label>
    );
});

export default TextInput;
