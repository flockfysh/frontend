import { useState, useEffect, useId } from 'react';
import { ReactSVG } from 'react-svg';

import help from '@/icons/main/help-circle.svg';

import classes from './styles.module.css';

export default function Input<T extends string | number>(props: {
    label?: string;
    value?: T;
    max?: number;
    min?: number;
    icon?: string;
    initialValue?: T;
    placeholder?: string;
    name?: string;
    tooltip?: string;
    saveLabel?: string;
    type?: string;
    onChange?: (data: T) => void;
    onSave?: (data: T) => void;
}) {
    const [value, setValue] = useState(() => {
        return props.value ?? props.initialValue;
    });
    const [inProgress, setInProgress] = useState(() => {
        return false;
    });
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        if (props.value !== undefined) setValue(props.value);
    }, [props.value]);

    const id = useId();

    return (
        <div className={classes.container}>
            {props.label ? (
                <div className={classes.labelContainer}>
                    <label className={classes.label} htmlFor={id}>
                        {props.label}
                    </label>
                    {props.tooltip ? (
                        <button className={classes.helpIcon}>
                            <ReactSVG src={help.src} />

                            <p className={classes.helpIconTooltip}>
                                {props.tooltip}
                            </p>
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}

            <label
                className={`${classes.inputContainer} ${
                    focus ? classes.focusedInput : ''
                } ${inProgress ? classes.inProgress : ''}`}
            >
                {props.icon ? <ReactSVG src={props.icon} /> : <></>}

                <input
                    id={id}
                    disabled={inProgress}
                    max={props.max}
                    min={props.min}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={(event) => {
                        setValue(event.currentTarget.value as T);
                    }}
                    value={value}
                    onFocus={() => {
                        setFocus(true);
                    }}
                    onBlur={() => setFocus(false)}
                    className={`${classes.input}`}
                />

                <button
                    disabled={inProgress}
                    className={classes.button}
                    onClick={async () => {
                        setInProgress(true);

                        if (value !== undefined) await props.onSave?.(value);

                        setInProgress(false);
                    }}
                >
                    {props.saveLabel ?? 'Update'}
                </button>
            </label>
        </div>
    );
}
