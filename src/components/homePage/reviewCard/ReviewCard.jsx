import classes from "./ReviewCard.module.css";

export default function ReviewCard(props) {
   return (
      <div className={ classes.cardDiv }>
         <div className={ classes.headContent }>
            <img className={ classes.image } src={ props.image } alt="" />

            <div className={ classes.textContent }>
               <h5 className={ classes.name }>
                  { props.name }
               </h5>

               <h6 className={ classes.designation }>
                  { props.designation }
               </h6>
            </div>
         </div>
         
         <p className={ classes.content }>
            { props.content }
         </p>
      </div>
   );
};
