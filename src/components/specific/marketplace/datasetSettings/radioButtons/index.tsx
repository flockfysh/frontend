import React from 'react';
import classes from './styles.module.css';
import help from '@/icons/main/help-circle.svg';
import { ReactSVG } from 'react-svg';

export default function RadioButtons<T>(props: {
    label?: string;
    options: { label: string, value: T }[];
    value?: T;
    initialValue?: T;
    name?: string;
    tooltip?: string;
    onChange?: (data: T) => void;
}) {
    const [value, setValue] = React.useState(() => {
        return props.value ?? props.initialValue;
    });

    React.useEffect(() => {
        if (props.value !== undefined) setValue(props.value);
    }, [props.value]);

    return (
        <div className={ classes.container }>
            { props.label ? (
                <div className={ classes.labelContainer }>
                    <label className={ classes.label }>{ props.label }</label>
                    { props.tooltip ? (
                        <button className={ classes.helpIcon }>
                            <ReactSVG src={ help.src }>
                            </ReactSVG>
                            <p className={ classes.helpIconTooltip }>{ props.tooltip }</p>
                        </button>
                    ) : <></> }
                </div>
            ) : <></> }
            <div className={ classes.buttons }>
                { props.options.map(function generate(option, index) {
                    return (
                        <button onClick={ () => {
                            setValue(option.value);
                            props.onChange?.(option.value);
                        } } className={ `${classes.button} ${option.value === value ? classes.selected : ''}` }
                                key={ option.value?.toString() ?? index.toString() }>
                            { option.label }
                        </button>
                    );
                }) }
            </div>
            <input type={ 'hidden' } value={ JSON.stringify(props.value) }></input>
        </div>
    );
}
