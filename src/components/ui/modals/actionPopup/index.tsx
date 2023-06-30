import React, { PropsWithChildren, createContext } from 'react';
import { ReactSVG } from 'react-svg';

import xMark from '@/icons/xmark.svg';
import classes from './styles.module.css';
import cross from '@/icons/main/x-circle.svg';

interface ActionPopupProps extends PropsWithChildren {
    blurBg: boolean;
    onOuterClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    className?: string;
    modalClassName?: string;
    popupTitle: string;
    onClose?: () => void;
    variant?: 'marketplace' | 'annotation';
}

interface PopupModalContext {
    close: () => void;
}

export const PopupModalContext = createContext<PopupModalContext>({
    close: () => {
    },
});

export default function ActionPopup(props: ActionPopupProps) {
    const markupMapping: Record<'marketplace' | 'annotation', React.ReactNode | undefined> = {
        annotation: <div className={`${classes.container} ${props.modalClassName ?? ''}`}>
            <div className={classes.header}>
                <ReactSVG className={classes.closeBtn} src={xMark.src} onClick={props.onClose}/>

                <h1 className={classes.headerText}>{props.popupTitle}</h1>
            </div>

            {props.children}
        </div>,
        marketplace: <div
            className={`${classes.container} ${classes.marketplaceVariant} ${props.modalClassName ?? ''}`}>
            <div className={classes.header}>
                <h3 className={classes.headerText}>Contribution Request</h3>
                <ReactSVG
                    src={cross.src}
                    className={classes.closeBtn}
                    onClick={props.onClose}
                />
            </div>
            {props.children}
        </div>,
    };

    return (
        <PopupModalContext.Provider
            value={{
                close: () => props.onClose?.(),
            }}
        >
            <div
                className={`${classes.overlay} ${props.blurBg ? classes.blurBg : ''} ${props.className || ''}`}
                onClick={e => {
                    if (e.target === e.currentTarget) props.onClose?.();
                }}
            >
                {markupMapping[props.variant ?? 'annotation']}
            </div>
        </PopupModalContext.Provider>
    );
}
