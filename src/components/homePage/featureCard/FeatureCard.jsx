import rocket from "../../../images/icons/rocket.svg";
import sparkles from "../../../images/icons/sparkles.svg";
import banknotes from "../../../images/icons/banknotes.svg";

import classes from "./FeatureCard.module.css";

const ICONS = {
   rocket: rocket,
   sparkles: sparkles,
   banknotes: banknotes,
}

export default function FeatureCard(props) {
   return (
      <div className={ classes.cardDiv }>
         <div className={ classes.headContent }>
            <div className={ classes.heading }>{ props.heading }</div>
            <img className={ classes.image } src={ ICONS[props.image] } alt="icon" />
         </div>

         <p className={ classes.content }>{ props.content }</p>
      </div>
   );
};
