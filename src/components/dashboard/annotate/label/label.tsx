import classes from './label.module.css';
import React from 'react';
import {RxCross1} from 'react-icons/rx';

interface LabelProps extends React.ComponentPropsWithRef<'button'> {
    dotColor?: string;
    used?: boolean;
    selected?: boolean;
    onRemove?: (e?: React.MouseEvent<HTMLButtonElement>) => boolean | void;
}

export default function Label(props: LabelProps) {
    const {dotColor, used, onRemove, ...buttonProps} = props;
    return (
        <div className={`${classes.labelContainer}`}>
            <button {...buttonProps} className={`${classes.label} ${props.used ? classes.used : ''} ${props.selected ? classes.selected : ''}`}>
                <div className={classes.colorDot} style={{
                    backgroundColor: props.dotColor
                }}/>
                <p className={classes.labelText}>{props.children}</p>
            </button>
            {onRemove ? (<button className={classes.removeButton} onClick={onRemove}>
                <RxCross1></RxCross1>
            </button>) : <></>}
        </div>
    );
}
