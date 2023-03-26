import { ReactNode } from 'react';
import classes from './index.module.css';

type AppProps = {
  heading: string;
  body: string;
  icon: string;
  children?: ReactNode;
};
const Card = ({ heading, body, icon }: AppProps) => {
  return (
    <div className={ classes.box }>
      <div>
        <h4 className={ classes.heading }>{heading}</h4>
        <img src={ icon } alt={ `${heading} Icon` } className={ classes.icon } />
      </div>
      <p className={ classes.body }>{body}</p>
    </div>
  );
};

export default Card;