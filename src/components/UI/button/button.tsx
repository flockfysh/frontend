import React from 'react';

import classes from './button.module.css';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    gradient?: boolean;
    gradientDirection?: string;
}

export default function Button(props: ButtonProps) {
    const { gradient, gradientDirection, ...buttonProps } = props;
    
    const gradDir = gradientDirection ? gradientDirection : 'topToBottom';

    let gradientClass = '';

    if (gradient) {
        switch (gradDir) {
            case 'topToBottom':
                gradientClass = classes.gradientBottomRight;
                break;
            case 'rightToLeft':
                gradientClass = classes.gradientRightLeft;
                break;
            case 'leftToRight':
                gradientClass = classes.gradientLeftRight;
                break;
            default:
                gradientClass = classes.gradientBottomRight;
        }
    }

    return (
        <button type={ 'button' } { ...buttonProps }
                className={ `${classes.button} ${gradientClass} ${props.className || ''}` }>
            {props.children}
        </button>
    );
}
