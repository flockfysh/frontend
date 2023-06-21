import classes from './styles.module.css';

export default function ActivityCard(props: { activity: UserActivity | DatasetActivity }) {
    return (
        <div className={ classes.container }>
            <div className={ classes.progressLineContainer }>
                <span className={ classes.progressCircle }></span>
                <span className={ classes.progressLine }></span>
            </div>

            <div className={ classes.rightSideContainer }>
                <p>p</p>

                {/* <p>{ props.activityDesc }</p> */}
            </div>
        </div>
    );
}
