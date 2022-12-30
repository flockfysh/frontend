import Button from '../../../UI/button/button';

import classes from './overview.module.css';

export default function Overview(props: { dataset: Dataset }) {
    return (
        <div className={ classes.overviewContainer }>
            <div className={ classes.overviewContentContainer }>
                <h1>{ props.dataset.name } dataset</h1>

                <p>
                    { props.dataset.overview }
                </p>

                <div className={ classes.overviewInfoCards }>
                    <div>
                        Images: { props.dataset.datasetImages.length }
                    </div>

                    <div>
                        Size of Dataset: { props.dataset.size }Gb
                    </div>

                    <div>
                        Date created: { props.dataset.dateCreated }
                    </div>
                </div>

                <div className={ classes.profileBtnContainer }>
                    <Button to="/dashboard" text="Return to Profile" hasArrow={ true } />   
                </div>
            </div>
        </div>
    );
}
