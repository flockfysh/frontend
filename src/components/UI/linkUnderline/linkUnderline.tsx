import { Link } from 'react-router-dom';

import classes from './linkUnderline.module.css';

type LinkUnderlineProps = {
  to: string;
  text: string;
  className?: string;
  isExternal?: boolean;
};

export default function LinkUnderline({
  className = '',
  isExternal = false,
  to,
  text
}: LinkUnderlineProps) {
  return (
    <>
      {isExternal ? (
        <a href={to} target="_blank" className={`${classes.link} ${className}`}>
          {text}
        </a>
      ) : (
        <Link to={to} className={`${classes.link} ${className}`}>
          {text}
        </Link>
      )}
    </>
  );
}
