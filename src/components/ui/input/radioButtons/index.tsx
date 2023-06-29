import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import help from '@/icons/main/help-circle.svg';

import classes from './styles.module.css';

export default function RadioButtons<T>(props: {
    label?: string;
    options: { label: string, value: T, shown?: boolean }[];
    value?: T;
    initialValue?: T;
    name?: string;
    tooltip?: string;
    onChange?: (data: T) => void;
}) {
    const [value, setValue] = useState(() => {
        return props.value ?? props.initialValue;
    });

    useEffect(() => {
        if (props.value !== undefined) setValue(props.value);
    }, [props.value]);

    return (
        <div className={ classes.container }>
            { props.label ? (
                <div className={ classes.labelContainer }>
                    <label className={ classes.label }>{ props.label }</label>
                    { props.tooltip ? (
                        <button className={ classes.helpIcon }>
                            <ReactSVG src={ help.src }/>

                            <p className={ classes.helpIconTooltip }>{ props.tooltip }</p>
                        </button>
                    ) : <></> }
                </div>
            ) : <></> }

            <div className={ classes.buttons }>
                { props.options.map(function generate(option, index) {
                    if (option.shown === false) {
                        return <></>;
                    }
                    return (
                        <button
                            onClick={ () => {
                                setValue(option.value);
                                props.onChange?.(option.value);
                            } }
                            type={ 'button' }
                            className={ `${classes.button} ${option.value === value ? classes.selected : ''}` }
                            key={ option.value?.toString() ?? index.toString() }
                        >
                            { option.label }
                        </button>
                    );
                }) }
            </div>

            <input type="hidden" name={ props.name } value={ JSON.stringify(value) }/>
        </div>
    );
}