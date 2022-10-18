import { Link } from "react-router-dom";
import classes from "./Link.module.css";

const LinkUnderline = props => {
   return (
      <Link to={props.to} className={classes.link}>
         {props.text}
      </Link>
   );
};

export default LinkUnderline;
