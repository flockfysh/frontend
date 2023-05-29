import { PropsWithChildren } from 'react';

import classes from './styles.module.css';

export default function FullScreenOverlayWithCenteredItem(props: PropsWithChildren<{
    opaqueBackdrop?: boolean;
    blurBg?: boolean;
    onOuterClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    className?: string
}>) {
    const opaqueBackdrop = props.opaqueBackdrop ?? true;
    const blurBg = props.blurBg ?? false;
    return (
        <div
            className={ `${classes.overlay} ${blurBg ? classes.blurBg : ''} ${opaqueBackdrop ? classes.opaque : ''} ${props.className || ''}` }
            onClick={ e => {
                if (e.target === e.currentTarget) {
                    props.onOuterClick?.(e);
                }
            } }>
            {props.children}
        </div>
    );
}
