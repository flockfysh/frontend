import classes from './coreBeliefCard.module.css';

type CoreBeliefCardProps = {
   heading: string;
   subHeading: string;
};

export default function CoreBeliefCard(props: CoreBeliefCardProps) {
   return (
      <div className={ classes.card }>
         <h5 className={ classes.heading }>
            { props.heading }
         </h5>

         <h6 className={ classes.subHeading }>
            { props.subHeading }
         </h6>
      </div>
   );
};
