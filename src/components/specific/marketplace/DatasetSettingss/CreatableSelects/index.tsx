import React from 'react';
import help from '@/icons/main/help-circle.svg';
import { ReactSVG } from 'react-svg';
import { CustomCreatableSelect } from '@/components/ui/input/select';
import classes from './styles.module.css';

export default function CreatableSelect(props: {
    icon?: string;
    label?: string;
    tooltip?: string;
    placeholder?: string;
    value?: string[];
    initialValue?: string[];
    onChange?: (data: string[]) => void;
}) {
    const [value, setValue] = React.useState(() => {
        return props.value ?? props.initialValue;
    });
    const [inProgress, setInProgress] = React.useState(() => {
        return false;
    });

    React.useEffect(() => {
        if (props.value !== undefined) setValue(props.value);
    }, [props.value]);

    const id = React.useId();

    return (
        <div className={ classes.container }>
            {props.label ? (
                <div className={ classes.labelContainer }>
                    <label className={ classes.label } htmlFor={ id }>{props.label}</label>
                    {props.tooltip ? (
                        <button className={ classes.helpIcon }>
                            <ReactSVG src={ help.src }>
                            </ReactSVG>
                            <p className={ classes.helpIconTooltip }>{props.tooltip}</p>
                        </button>
                    ) : <></>}
                </div>
            ) : <></>}
            <CustomCreatableSelect
                isMulti={ true } id={ id }
                placeholder={ props.placeholder }
                onChange={ async event => {
                    setInProgress(true);
                    const raw = (event as { value: string, label: string }[]).map(i => i.value);
                    setValue(raw);
                    await props.onChange?.(raw);
                    setInProgress(false);
                } }
                value={ value?.map(i => {
                    return {
                        value: i,
                        label: i,
                    };
                }) }
                className={ `${classes.input}` }
                classNames={ {
                    control: () => {
                        return classes.inputControl;
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
                    }
                } }></CustomCreatableSelect>
        </div>
    );
}
