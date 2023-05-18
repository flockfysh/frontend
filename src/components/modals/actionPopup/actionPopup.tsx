import React, { PropsWithChildren } from 'react';
import classes from './actionPopup.module.css';

interface ActionPopupProps extends PropsWithChildren {
    blurBg: boolean;
    onOuterClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    className?: string
    modalClassName?: string
}

export default function ActionPopup(props: ActionPopupProps) {
    return (
        <div className={ `${classes.overlay} ${props.blurBg ? classes.blurBg : ''} ${props.className || ''}` }
             onClick={ e => {
                 if (e.target === e.currentTarget) {
                     props.onOuterClick?.(e);
                 }
             } }>
            <div className={ `${classes.container} ${props.modalClassName ?? ''}` }>
                {props.children}
            </div>
        </div>
    );
}
