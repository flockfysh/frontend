import classes from './label.module.css';
import React from 'react';

interface LabelProps extends React.ComponentPropsWithRef<'button'> {
    dotColor?: string;
    selected?: boolean;
}

export default function Label(props: LabelProps) {
    const {dotColor, ...buttonProps} = props;
    return (
        <div className={`${classes.labelContainer}`}>
            <button {...buttonProps} className={`${classes.label} ${props.selected ? classes.selected : ''}`}>
                <div className={classes.colorDot} style={{
                    backgroundColor: props.dotColor
                }}/>
                <p className={classes.labelText}>{props.children}</p>
            </button>
        </div>
    );
}
