import { ReactNode } from 'react';
import { RxArrowRight } from 'react-icons/rx';
import Link from 'next/link';

import classes from './styles.module.css';

type GradientLinkProps = {
    gradientDirection?: string;
    hasArrow?: boolean;
    to: string;
    children?: ReactNode;
    className?: string;
};

export default function GradientLink(props: GradientLinkProps) {
    const gradientDirection = props.gradientDirection
        ? props.gradientDirection
        : 'topToBottom';
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

    if (props.to.startsWith('http'))
        return (
            <a
                className={ `${classes.button} ${gradientClass} ${
                    props.className || ''
                }` }
                href={ props.to }
                target="_blank"
            >
                { props.children }

                { hasArrow ? <RxArrowRight className={ classes.svg } /> : <></> }
            </a>
        );

    return (
        <Link
            className={ `${classes.button} ${gradientClass} ${
                props.className || ''
            }` }
            href={ props.to }
        >
            { props.children }

            { hasArrow ? <RxArrowRight className={ classes.svg } /> : <></> }
        </Link>
    );
}
