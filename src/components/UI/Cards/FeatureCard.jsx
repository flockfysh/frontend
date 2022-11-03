import classes from "./FeatureCard.module.css";

const FeatureCard = props => {
   return (
      <div className={classes.cardDiv}>
         <div className={classes.headContent}>
            <div className={classes.heading}>{props.heading}</div>
            {
               //<img className={classes.image} src={props.image} alt="" />
            }
         </div>
         <p className={classes.content}>{props.content}</p>
      </div>
   );
};

export default FeatureCard;