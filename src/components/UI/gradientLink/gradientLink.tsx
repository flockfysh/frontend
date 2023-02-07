import {Link} from 'react-router-dom';

import classes from './gradientLink.module.css';
import React from 'react';
import { RxArrowRight } from 'react-icons/rx';

type GradientLinkProps = {
    gradientDirection?: string;
    hasArrow?: boolean;
    to: string;
    children?: React.ReactNode;
    className?: string;
};

export default function GradientLink(props: GradientLinkProps) {
    const gradientDirection = props.gradientDirection ? props.gradientDirection : 'topToBottom';
    const hasArrow = props.hasArrow ? props.hasArrow : false;

    let gradientClass;

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

    return (
        <Link className={`${classes.button} ${gradientClass} ${props.className || ''}`} to={props.to}>
            {props.children}

            {
                hasArrow ? <RxArrowRight className={classes.svg}/> : <></>
            }
        </Link>
    );
}
