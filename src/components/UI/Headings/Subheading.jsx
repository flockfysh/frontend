import classes from "./Subheading.module.css";

const SubHeading = props => {
   return (
      <h1 className={classes.subHeading}>
         {props.beforeSpan}
         <span className={classes.span}>{props.span}</span>
         {props.afterSpan}
      </h1>
   );
};

export default SubHeading;
