import classes from "./Header.module.css";

export default function Heading(props) {
   return (
      <h1 className={classes.heading}>
         {props.beforeSpan}
         <span className={classes.span}>{props.span}</span>
         {props.afterSpan}
      </h1>
   );
}
