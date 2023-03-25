import { formatFileSize } from '../../../../helpers/formatting';

import GradientLink from '../../../UI/gradientLink/gradientLink';

import classes from '../common.module.css';

export default function Overview(props: { dataset: Dataset }) {
    return (
        <div className={ classes.container }>
            <section className={ classes.contentContainer }>
                <div className={ classes.titleBar }>
                    <h1>{ props.dataset.name } dataset</h1>

                    <GradientLink className={ classes.utilityButton } to={ `/dashboard/${props.dataset.id}/annotate` } hasArrow={ true }>
                        {props.dataset.numTimesHumanFeedback > 0 ? 'Validate feedback' : 'Annotate'}
                    </GradientLink>
                </div>

                <p>{ props.dataset.description }</p>
                
                <ul className={ classes.infoCards }>
                    <li>Total items: { props.dataset.entityInfo.itemCount }</li>
                    <li>Uploaded items: { props.dataset.entityInfo.uploadedItemCount }</li>
                    <li>Items pending feedback: { props.dataset.entityInfo.feedbackItemCount }</li>
                    <li>Dataset items: { props.dataset.entityInfo.completedItemCount }</li>
                    <li>Size of Dataset: { formatFileSize(props.dataset.entityInfo.size) }</li>
                    <li>Date created: { props.dataset.dateCreated.toDateString() }</li>
                </ul>
            </section>
        </div>
    );
}
