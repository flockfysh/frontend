import React, { PropsWithChildren } from 'react';
import classes from './styles.module.css';

export default function FullScreenOverlayWithCenteredItem(props: PropsWithChildren<{
    opaqueBackdrop?: boolean;
    onOuterClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    className?: string
}>) {
    const opaqueBackdrop = props.opaqueBackdrop ?? true;
    return (
        <div className={ `${classes.overlay} ${opaqueBackdrop ? classes.opaque : ''} ${props.className || ''}` }
             onClick={ e => {
                 if (e.target === e.currentTarget) {
                     props.onOuterClick?.(e);
                 }
             } }>
            {props.children}
        </div>
    );
}
