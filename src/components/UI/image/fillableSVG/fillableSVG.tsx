import React, {ComponentPropsWithRef} from 'react';
import classes from './fillableSVG.module.css';

export default function FillableSVG(props: ComponentPropsWithRef<'img'>) {
    return (
        <div className={`${classes.outerDiv} ${props.className || ''}`}
             style={{
                 mask: `url(${props.src}) no-repeat center / contain`,
                 WebkitMask: `url(${props.src}) no-repeat center / contain`,
             }}>
            <img {...props} className={classes.fillableSVGInner} src={props.src} alt={props.alt}/>
        </div>
    );
}