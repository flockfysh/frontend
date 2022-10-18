import { Link } from "react-router-dom";
import classes from "./Button.module.css";
const Button = props => {
   return (
      <Link className={classes.button} to={props.link}>
         {props.text}
         <svg
            className={classes.svg}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
         </svg>
      </Link>
   );
};

export default Button;
