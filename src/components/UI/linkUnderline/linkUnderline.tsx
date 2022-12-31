import { Link } from 'react-router-dom';

import classes from './linkUnderline.module.css';

type LinkUnderlineProps = {
  to: string;
  text: string;
};

export default function LinkUnderline(props: LinkUnderlineProps) {
  return (
    <Link to={ props.to } className={ classes.link }>
      { props.text }
    </Link>
  );
}
