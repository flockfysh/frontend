import { PropsWithChildren } from 'react';
import { ReactSVG } from 'react-svg';

import xMark from '@/icons/xmark.svg';

import classes from './actionPopup.module.css';

interface ActionPopupProps extends PropsWithChildren {
    blurBg: boolean;
    onOuterClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    className?: string
    modalClassName?: string
    popupTitle: string;
    onClose?: () => void;
}

export default function ActionPopup(props: ActionPopupProps) {
    return (
        <div
            className={ `${classes.overlay} ${props.blurBg ? classes.blurBg : ''} ${props.className || ''}` }
            onClick={ e => {
                if (e.target === e.currentTarget) {
                    props.onOuterClick?.(e);
                }
            } }
        >
            <div className={ `${ classes.container } ${ props.modalClassName ?? '' }` }>
                <div className={ classes.header }>
                    <ReactSVG className={ classes.closeBtn } src={ xMark.src } onClick={ props.onClose } />
                    
                    <h1 className={ classes.headerText }>{ props.popupTitle }</h1>
                </div>

                { props.children }
            </div>
        </div>
    );
}
