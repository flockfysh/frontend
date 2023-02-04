import classes from './label.module.css';
import React from "react";

interface LabelProps extends React.ComponentPropsWithRef<"button"> {
    dotColor?: string;
    active?: boolean;
}

export default function Label(props: LabelProps) {
    const {dotColor, active, ...buttonProps} = props;
    return (
        <button {...buttonProps} className={ `${classes.label} ${props.active ? classes.active : ""}` }>
            <div className={ classes.colorDot } style={{
                backgroundColor: props.dotColor
            }}/>
            <p className={ classes.labelText }>{ props.children }</p>
        </button>
    );
}
