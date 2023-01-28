import React from "react";

import classes from './button.module.css';

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
    gradient?: boolean;
    gradientDirection?: string;
}

export default function Button(props: ButtonProps) {
    let {gradient, gradientDirection, ...buttonProps} = props;
    gradientDirection ??= 'topToBottom';

    let gradientClass = "";

    if (props.gradient) {
        switch (gradientDirection) {
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
        <button type={"button"} { ...buttonProps }
                className={`${classes.button} ${gradientClass} ${props.className || ""}`}>
            {props.children}
        </button>
    );
}
