import { PropsWithChildren } from 'react';

import classes from './styles.module.css';

interface CustomModalProps extends PropsWithChildren {
    blurBg: boolean;
    onOuterClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    className?: string
    modalClassName?: string
    popupTitle: string;
    onClose?: () => void;
}

export default function CustomModal(props: CustomModalProps) {
    return (
        <div
            className={ `${ classes.overlay } ${ props.blurBg ? classes.blurBg : '' } ${ props.className || '' }` }
            onClick={ e => {
                if (e.target === e.currentTarget) props.onOuterClick?.(e);
            } }
        >
            <div className={ `${ classes.container } ${ props.modalClassName ?? '' }` }>
                <div className={ classes.header }>
                    <h1 className={ classes.headerText }>{ props.popupTitle }</h1>
                </div>

                { props.children }
            </div>
        </div>
    );
}
