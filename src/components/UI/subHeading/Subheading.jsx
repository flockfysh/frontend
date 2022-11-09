import classes from "./Subheading.module.css";

export default function SubHeading(props) {
   return (
      <h1 className={ classes.subHeading }>
         { props.beforeSpan }
         <span className={ classes.span }>{ props.span }</span>
         { props.afterSpan }
      </h1>
   );
};
