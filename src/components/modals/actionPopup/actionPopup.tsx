import { PropsWithChildren } from 'react';

import classes from './actionPopup.module.css';

interface ActionPopupProps extends PropsWithChildren {
    blurBg: boolean;
}

export default function ActionPopup(props: ActionPopupProps) {
    return (
        <div className={ classes.overlay + ' ' + (props.blurBg ? classes.blurBg : '') }>
            <div className={ classes.container }>
                { props.children }
            </div>
        </div>
    );
}
