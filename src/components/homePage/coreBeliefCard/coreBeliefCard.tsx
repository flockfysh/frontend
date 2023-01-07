import classes from './coreBeliefCard.module.css';

type CoreBeliefCardProps = {
  heading: string;
  subHeading: string;
};

export default function CoreBeliefCard(props: CoreBeliefCardProps) {
  return (
    <div className={ classes.card }>
      <h3 className={ classes.heading }>{ props.heading }</h3>

      <p className={ classes.subHeading }>{ props.subHeading }</p>
    </div>
  );
}
