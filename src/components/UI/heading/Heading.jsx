import classes from "./Heading.module.css";

export function Heading(props) {
   return (
      <h1 className={ classes.heading }>
         { props.beforeSpan }
         <span className={ classes.span }>{ props.span }</span>
         { props.afterSpan }
      </h1>
   );
};
