import { useState, useEffect, useId } from 'react';
import { ReactSVG } from 'react-svg';

import CustomSelect from '@/components/ui/input/select';

import help from '@/icons/main/help-circle.svg';

import classes from './styles.module.css';

export default function Select(props: {
    icon?: string;
    label?: string;
    tooltip?: string;
    placeholder?: string;
    value?: { label: string; value: string };
    initialValue?: { label: string; value: string };
    options: { label: string; value: string }[];
    onChange?: (data: string) => void;
}) {
    const [value, setValue] = useState<
        { label: string; value: string } | undefined
    >(() => {
        return props.value ?? props.initialValue;
    });

    const [_, setInProgress] = useState(() => {
        return false;
    });

    useEffect(() => {
        if (props.value !== undefined) setValue(props.value);
    }, [props.value]);

    const id = useId();

    return (
        <div className={ classes.container }>
            { props.label ? (
                <div className={ classes.labelContainer }>
                    <label className={ classes.label } htmlFor={ id }>
                        { props.label }
                    </label>

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

            <CustomSelect
                id={ id }
                options={ props.options }
                placeholder={ props.placeholder }
                onChange={ async (event) => {
                    setInProgress(true);
                    const raw = event as { value: string; label: string };
                    setValue(raw);
                    await props.onChange?.(raw.value);
                    setInProgress(false);
                } }
                value={ value }
                className={ `${classes.input}` }
                classNames={ {
                    control: () => {
                        return classes.inputContainer;
                    },
                    multiValue: () => {
                        return classes.inputMultiValue;
                    },
                    valueContainer: () => {
                        return classes.valueContainer;
                    },
                    multiValueLabel: () => {
                        return classes.multiValueLabel;
                    },
                    multiValueRemove: () => {
                        return classes.multiValueRemove;
                    },
                } }
            />
        </div>
    );
}
