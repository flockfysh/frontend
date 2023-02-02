import {Link} from 'react-router-dom';

import classes from './gradientLink.module.css';

type GradientLinkProps = {
    gradientDirection?: string;
    hasArrow?: boolean;
    to: string;
    text: string;
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
        <Link className={`${classes.button} ${gradientClass} ${props.className || ""}`} to={props.to}>
            {props.text}

            {
                hasArrow ?
                    <svg
                        className={classes.svg}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg> : <></>
            }
        </Link>
    );
}
