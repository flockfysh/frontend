import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { ReactSVG } from 'react-svg';

import classes from './styles.module.css';

interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
    icon?: string;
    label?: string;
    classNames?: {
        container?: string;
        input?: string;
        label?: string;
    };
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput(props, _) {
        return (
            <label
                className={`${props.classNames?.container || ''} ${
                    classes.labelContainer
                }`}
            >
                {props.label ? (
                    <span
                        className={`${props.classNames?.label} ${classes.label}`}
                    >
                        {props.label}
                    </span>
                ) : (
                    <></>
                )}

                <div className={classes.inputContainer}>
                    <input
                        {...props}
                        className={`${props.classNames?.input || ''} ${
                            classes.input
                        } ${props.icon ? classes.inputWithIcon : ''}`}
                    />

                    {props.icon ? (
                        <ReactSVG src={props.icon} className={classes.icon} />
                    ) : (
                        ''
                    )}
                </div>
            </label>
        );
    }
);

export default TextInput;
