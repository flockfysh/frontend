import { Link } from 'react-router-dom';

import classes from './linkUnderline.module.css';

type LinkUnderlineProps = {
  to: string;
  text: string;
  className?: string;
};

export default function LinkUnderline(props: LinkUnderlineProps) {
  return (
    <a href={ props.to } target="_blank" className={ `${classes.link} ${props.className || ''}` }>
      { props.text }
    </a>
  );
}
