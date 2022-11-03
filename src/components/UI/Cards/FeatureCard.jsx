import classes from "./FeatureCard.module.css";
import rocket from "../../../images/icons/rocket.svg";
import sparkles from "../../../images/icons/sparkles.svg";
import banknotes from "../../../images/icons/banknotes.svg";

const FeatureCard = props => {
   
   const ICONS = {
      rocket: rocket,
      sparkles: sparkles,
      banknotes: banknotes,
   }

   return (
      <div className={classes.cardDiv}>
         <div className={classes.headContent}>
            <div className={classes.heading}>{props.heading}</div>
               <img className={classes.image} src={ICONS[props.image]} alt="icon" />
         </div>
         <p className={classes.content}>{props.content}</p>
      </div>
   );
};

export default FeatureCard;