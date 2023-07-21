import { PropsWithChildren, createContext, useState } from 'react';
import { ReactSVG } from 'react-svg';

import xMark from '@/icons/xmark.svg';
import classes from './styles.module.css';

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
    close: () => {},
});

export default function ActionPopup(props: ActionPopupProps) {
    const [fadeOut, updateFadeOut] = useState(false);

    const markupMapping: Record<
        'marketplace' | 'annotation',
        React.ReactNode | undefined
    > = {
        annotation: (
            <div
                className={ `${classes.container} ${props.modalClassName ?? ''}` }
            >
                <div className={ classes.header }>
                    <ReactSVG
                        className={ classes.closeBtn }
                        src={ xMark.src }
                        onClick={ () => updateFadeOut(true) }
                    />

                    <h1 className={ classes.headerText }>{ props.popupTitle }</h1>
                </div>

                { props.children }
            </div>
        ),
        marketplace: (
            <div
                className={ `${classes.container} ${
                    classes.marketplaceVariant
                } ${props.modalClassName ?? ''}` }
            >
                <div className={ classes.header }>
                    <h3 className={ classes.headerText }>{ props.popupTitle }</h3>

                    <ReactSVG
                        src={ xMark.src }
                        className={ classes.closeBtn }
                        onClick={ () => updateFadeOut(true) }
                    />
                </div>
                { props.children }
            </div>
        ),
    };

    return (
        <PopupModalContext.Provider
            value={ {
                close: () => props.onClose?.(),
            } }
        >
            <div
                className={ `
                    ${classes.overlay}
                    ${props.blurBg ? classes.blurBg : ''}
                    ${props.className || ''}
                    ${fadeOut ? classes.fadeOut : ''}
                    ` }
                onClick={ (e) => {
                    if (e.target === e.currentTarget) updateFadeOut(true);
                } }
                onAnimationEnd={ () => {
                    if (fadeOut) props.onClose?.();
                } }
            >
                { markupMapping[props.variant ?? 'annotation'] }
            </div>
        </PopupModalContext.Provider>
    );
}
