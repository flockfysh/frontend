import { Link } from 'react-router-dom';

import classes from './gradientLink.module.css';
import React from 'react';
import { RxArrowRight } from 'react-icons/rx';

type GradientLinkProps = {
  gradientDirection?: string;
  hasArrow?: boolean;
  to: string;
  children?: React.ReactNode;
  className?: string;
  isExternal?: boolean;
};

export default function GradientLink({
  gradientDirection = 'topToBottom',
  hasArrow = false,
  isExternal = false,
  className,
  to,
  children
}: GradientLinkProps) {
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
    <>
      {isExternal ? (
        <a
          className={`${classes.button} ${gradientClass} ${className || ''}`}
          href={to}
          target="_blank"
        >
          {children}
          {hasArrow ? <RxArrowRight className={classes.svg} /> : <></>}
        </a>
      ) : (
        <Link
          className={`${classes.button} ${gradientClass} ${className || ''}`}
          to={to}
        >
          {children}
          {hasArrow ? <RxArrowRight className={classes.svg} /> : <></>}
        </Link>
      )}
    </>
  );
}
