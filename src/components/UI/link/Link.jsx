import { Link } from "react-router-dom";

import classes from "./Link.module.css";

export default function LinkUnderline(props) {
   return (
      <Link to={ props.to } className={ classes.link }>
         { props.text }
      </Link>
   );
};

