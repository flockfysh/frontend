import GradientLink from '../../../UI/gradientLink/gradientLink';

import classes from '../common.module.css';
import {formatFileSize} from "../../../../helpers/formatting";

export default function Overview(props: { dataset: Dataset }) {
    return (
        <div className={classes.container}>
            <section className={classes.contentContainer}>
                <div className={classes.titleBar}>
                    <h1>{props.dataset.name} dataset</h1>
                    <GradientLink className={classes.utilityButton} to={`/dashboard/${props.dataset.id}/annotate`} text="Annotate" hasArrow={true}/>
                </div>
                <p>{props.dataset.description}</p>
                <ul className={classes.infoCards}>
                    <li>Uploaded items: {props.dataset.uploadedImages.length}</li>
                    <li>Dataset items: {props.dataset.datasetImages.length}</li>
                    <li>Size of Dataset: {formatFileSize(props.dataset.size)}</li>
                    <li>Date created: {props.dataset.dateCreated.toDateString()}</li>
                </ul>
            </section>
        </div>
    );
}
