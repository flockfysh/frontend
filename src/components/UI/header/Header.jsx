import classes from "./Header.module.css";

export default function Header(props) {
   return (
      <h1 className={classes.header}>
         {props.beforeSpan}
         <span className={classes.span}>{props.span}</span>
         {props.afterSpan}
      </h1>
   );
}
