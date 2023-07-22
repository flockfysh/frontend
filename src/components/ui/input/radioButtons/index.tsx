import { useState, useEffect, ComponentPropsWithRef } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';

import help from '@/icons/main/help-circle.svg';

import classes from './styles.module.css';

export default function RadioButtons<T>(props: {
    label?: string;
    options: { label: string; value: T; shown?: boolean }[];
    highlightCallback?: (value: T) => boolean;
    value?: T;
    initialValue?: T;
    name?: string;
    tooltip?: string;
    isLink?: boolean;
    onChange?: (data: T) => void;
}) {
    const [value, setValue] = useState(() => {
        return props.value ?? props.initialValue;
    });

    useEffect(() => {
        if (props.value !== undefined) setValue(props.value);
    }, [props.value]);

    const Component = props.isLink
        ? Link
        : ({ ...props }: ComponentPropsWithRef<'button'>) => (
              <button { ...props } />
          );

    return (
        <div className={ classes.container }>
            { props.label ? (
                <div className={ classes.labelContainer }>
                    <label className={ classes.label }>{ props.label }</label>

                    { props.tooltip ? (
                        <button className={ classes.helpIcon }>
                            <ReactSVG src={ help.src } />

                            <p className={ classes.helpIconTooltip }>
                                { props.tooltip }
                            </p>
                        </button>
                    ) : (
                        <></>
                    ) }
                </div>
            ) : (
                <></>
            ) }
            <div className={ classes.buttons }>
                { props.options.map(function generate(option, index) {
                    if (option.shown === false) return <></>;
                    let selected;

                    if (props.highlightCallback)
                        selected = props.highlightCallback(option.value);
                    else selected = option.value === value;

                    return (
                        <Component
                            href={ option.value?.toString() ?? '' }
                            onClick={ (_e) => {
                                setValue(option.value);
                                props.onChange?.(option.value);
                            } }
                            type="button"
                            className={ `${classes.button} ${
                                selected ? classes.selected : ''
                            }` }
                            key={ option.value?.toString() ?? index.toString() }
                        >
                            { option.label }
                        </Component>
                    );
                }) }
            </div>

            <input
                type="hidden"
                name={ props.name }
                value={ JSON.stringify(value) }
            />
        </div>
    );
}
