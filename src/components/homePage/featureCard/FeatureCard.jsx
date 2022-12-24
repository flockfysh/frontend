import rocket from '../../../images/icons/rocket.svg';
import sparkles from '../../../images/icons/sparkles.svg';
import bankNotes from '../../../images/icons/bankNotes.svg';

import classes from './featureCard.module.css';

const ICONS = {
   rocket: rocket,
   sparkles: sparkles,
   banknotes: bankNotes,
};

export default function FeatureCard(props) {
   return (
      <div className={ classes.cardDiv }>
         <div className={ classes.headContent }>
            <div className={ classes.heading }>
               { props.heading }
            </div>

            <img className={ classes.image } src={ ICONS[props.image] } alt="icon" />
         </div>

         <p className={ classes.content }>
            { props.content }
         </p>
      </div>
   );
};
