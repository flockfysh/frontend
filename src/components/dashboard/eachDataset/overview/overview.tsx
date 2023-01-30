import GradientLink from '../../../UI/gradientLink/gradientLink';

import classes from '../common.module.css';

export default function Overview(props: { dataset: Dataset }) {
    return (
        <div className={classes.container}>
            <div className={classes.contentContainer}>
                <h1>{props.dataset.name} dataset</h1>

                <p>{props.dataset.description}</p>

                <ul className={classes.infoCards}>
                    <li>Images: {props.dataset.datasetImages.length}</li>

                    <li>Size of Dataset: {props.dataset.size}GB</li>

                    <li>Date created: {props.dataset.dateCreated.toDateString()}</li>
                </ul>

                <div className={classes.btnContainer}>
                    <GradientLink to="/dashboard" text="Return to Profile" hasArrow={true}/>
                </div>
            </div>
        </div>
    );
}
