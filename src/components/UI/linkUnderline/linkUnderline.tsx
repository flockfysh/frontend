import { Link } from 'react-router-dom';

import classes from './linkUnderline.module.css';

type LinkUnderlineProps = {
  to: string;
  text: string;
  className?: string;
};

export default function LinkUnderline(props: LinkUnderlineProps) {
  if(props.to.startsWith('http')) return (
    <a className={ `${ classes.link } ${ props.className || '' }` } href={ props.to } target="_blank">
        { props.text }
    </a>
  );

  return (
    <Link to={ props.to } className={ `${classes.link} ${props.className || ''}` }>
      { props.text }
    </Link>
  );
}
